import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService, AuthSigninInput } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent implements OnDestroy {
  formGroup: FormGroup;
  errorMessage = '';
  hidePassword = true;
  isLoading = false;
  private readonly isDestroyed$ = new Subject<boolean>();

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.formGroup = this.createFormGroup('submit');
  }

  get identifier(): AbstractControl | null {
    return this.formGroup.get('identifier');
  }

  get password(): AbstractControl | null {
    return this.formGroup.get('password');
  }

  submit(formGroup: FormGroup): Subscription | undefined {
    if (!formGroup.valid) {
      this.formGroup = this.createFormGroup(
        'change',
        formGroup.value as { [key: string]: unknown }
      );
      this.formGroup.markAllAsTouched();

      return undefined;
    }

    const authSigninInput: AuthSigninInput = {
      identifier: this.identifier?.value as string,
      password: this.password?.value as string,
    };

    this.errorMessage = '';
    this.hidePassword = true;
    this.isLoading = true;
    this.formGroup.disable();

    return this.authService
      .signin$(authSigninInput)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe({
        next: () => this.router.navigate(['home']),
        error: (err: HttpErrorResponse) => {
          this.errorMessage = (err.error as { message: string })?.message ?? '';
          this.isLoading = false;
          this.formGroup.enable();
        },
      });
  }

  ngOnDestroy(): void {
    console.info(`💥 destroy: ${this.constructor.name}`);
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  private createFormGroup(
    updateOn: 'submit' | 'change',
    previousValue?: { [key: string]: unknown }
  ): FormGroup {
    const formGroup = this.formBuilder.group(
      // tslint:disable
      {
        identifier: [undefined, [Validators.required]],
        password: [undefined, [Validators.required]],
      },
      {
        updateOn,
        validators: this.mustNotBeRejectedValidator(),
      }
      // tslint:enable
    );

    if (previousValue !== undefined) {
      formGroup.setValue(previousValue);
    }

    return formGroup;
  }

  private mustNotBeRejectedValidator(): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      if (this.errorMessage === 'incorrect username or email') {
        formGroup.controls.identifier.setErrors({ mustNotBeRejected: true });
        this.errorMessage = $localize`:@@please-check-your-identifier:Please check your username or email`;
      }
      if (this.errorMessage === 'incorrect password') {
        formGroup.controls.password.setErrors({ mustNotBeRejected: true });
        this.errorMessage = $localize`:@@please-check-your-password:Please check your password`;
      }
    };
  }
}
