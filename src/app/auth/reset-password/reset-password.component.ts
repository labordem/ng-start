import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  isDone = false;
  isLoading = false;
  isProcessing = false;
  isValidToken = false;
  isPasswordHidden = true;
  token = '';
  errorMessage = '';
  private readonly isDestroyed$ = new Subject<boolean>();

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly snackbarService: SnackbarService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.formGroup = this.createFormGroup('change');
  }

  ngOnInit(): Subscription | undefined {
    this.token = this.activatedRoute.snapshot.paramMap.get('token') ?? '';

    return this.token === '' ? undefined : this.verifyToken(this.token);
  }

  ngOnDestroy(): void {
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  onSubmit(): Subscription | undefined {
    this.isProcessing = true;
    this.formGroup.disable();
    this.isPasswordHidden = true;

    return this.authService
      .setNewPassword$({
        password: this.f.password?.value as string,
      })
      .pipe(
        finalize(() => {
          this.isProcessing = false;
          this.formGroup.enable();
          this.changeDetectorRef.detectChanges();
        }),
        takeUntil(this.isDestroyed$),
      )
      .subscribe(
        (res) => (this.isDone = true),
        (err) => (this.errorMessage = (err as Error)?.message),
      );
  }

  private createFormGroup(
    updateOn: 'submit' | 'change',
    previousValue?: { [key: string]: unknown },
  ): FormGroup {
    // tslint:disable
    const formGroup = this.formBuilder.group(
      {
        password: [
          null,
          [Validators.required, Validators.pattern(/^.{8,191}$/)],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        updateOn,

        validators: [
          this.mustNotBeRejectedValidator(),
          this.mustMatchValidator('password', 'confirmPassword'),
        ],
      },
      // tslint:enable
    );
    if (previousValue !== undefined) {
      formGroup.setValue(previousValue);
    }

    return formGroup;
  }

  private verifyToken(token: string): Subscription {
    this.isLoading = true;

    return this.authService
      .verifyResetPasswordToken$({ token })
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        }),
        takeUntil(this.isDestroyed$),
      )
      .subscribe(
        (res) => (this.isValidToken = true),
        (err) => (this.isValidToken = false),
      );
  }

  private mustNotBeRejectedValidator(): () => void {
    return () => {
      if (this.errorMessage !== '') {
        this.snackbarService.open(this.errorMessage, 'warn');
      }
      this.errorMessage = '';
    };
  }

  private mustMatchValidator(
    controlName: string,
    matchingControlName: string,
  ): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors !== null &&
        !matchingControl.errors.mustMatch
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        // tslint:disable-next-line: no-null-keyword
        matchingControl.setErrors(null);
      }
    };
  }
}
