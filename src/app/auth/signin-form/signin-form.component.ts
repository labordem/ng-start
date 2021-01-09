import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninFormComponent implements OnInit, OnDestroy {
  @Output() readonly errorHappens = new EventEmitter<string>();
  formGroup: FormGroup;
  isLoading = false;
  isPasswordHidden = true;
  errorMessage = '';
  private readonly isDestroyed$ = new Subject<boolean>();

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackbarService: SnackbarService
  ) {
    this.formGroup = this.createFormGroup('change');
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    console.info(`💥 destroy: ${this.constructor.name}`);
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  onSubmit(): Subscription | undefined {
    this.isLoading = true;
    this.formGroup.disable();
    this.isPasswordHidden = true;

    return this.authService
      .signin$({
        identifier: this.f.identifier?.value as string,
        password: this.f.password?.value as string,
      })
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (err: Error) => {
          this.errorHappens.emit(err.message);
          this.errorMessage = err.message;
          this.isLoading = false;
          this.formGroup.enable();
        },
      });
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

  private mustNotBeRejectedValidator(): () => void {
    return () => {
      if (this.errorMessage === 'Auth.form.identifier.invalid') {
        this.f.identifier.setErrors({ mustNotBeRejected: true });
      } else if (this.errorMessage === 'Auth.form.password.invalid') {
        this.f.password.setErrors({ mustNotBeRejected: true });
      } else if (this.errorMessage !== '') {
        this.snackbarService.open(this.errorMessage, 'warn');
      }
      this.errorMessage = '';
    };
  }
}
