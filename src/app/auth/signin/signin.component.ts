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
    this.formGroup = this.formBuilder.group(
      // tslint:disable
      {
        email: [
          undefined,
          [Validators.required, Validators.pattern(authService.emailRegexp)],
        ],
        password: [undefined, [Validators.required]],
      },
      {
        validators: this.mustNotBeRejectedValidator(),
      }
      // tslint:enable
    );
  }

  get email(): AbstractControl | null {
    return this.formGroup.get('email');
  }

  get password(): AbstractControl | null {
    return this.formGroup.get('password');
  }

  submit(formGroup: FormGroup): Subscription {
    const authSigninInput: AuthSigninInput = {
      email: formGroup.get('email')?.value as string,
      password: formGroup.get('password')?.value as string,
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
        error: (err: string) => {
          this.errorMessage = err;
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

  private mustNotBeRejectedValidator(): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      if (this.errorMessage === 'email not found') {
        formGroup.controls.email.setErrors({ mustNotBeRejected: true });
        this.errorMessage = $localize`:@@please-check-your-email:Please check your email`;
      }
      if (this.errorMessage === 'incorrect password') {
        formGroup.controls.password.setErrors({ mustNotBeRejected: true });
        this.errorMessage = $localize`:@@please-check-your-password:Please check your password`;
      }
    };
  }
}
