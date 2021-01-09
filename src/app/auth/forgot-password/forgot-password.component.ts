import {
  ChangeDetectionStrategy,
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
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

import { AuthService } from '../auth.service';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
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
    private readonly snackbarService: SnackbarService,
    private readonly dialog: MatDialog
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

    return this.authService
      .requestResetPasswordToken$({
        email: this.f.email?.value as string,
      })
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe({
        next: async () => {
          const dialog = this.dialog.open(ForgotPasswordDialogComponent);
          await dialog.afterClosed().toPromise();
          this.router.navigate(['/auth']);
        },
        error: (err: Error) => {
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
    return this.formBuilder.group(
      // tslint:disable
      {
        email: [
          null,
          [
            Validators.required,
            Validators.pattern(
              /^(?=.{4,64}$)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
            ),
          ],
        ],
      },
      {
        updateOn,
        validators: this.mustNotBeRejectedValidator(),
      }
      // tslint:enable
    );
  }

  private mustNotBeRejectedValidator(): () => void {
    return () => {
      if (this.errorMessage === 'Auth.form.error.user.not-exist') {
        this.f.email.setErrors({ mustNotBeRejected: true });
      } else if (this.errorMessage !== '') {
        this.snackbarService.open(this.errorMessage, 'warn');
      }
      this.errorMessage = '';
    };
  }
}
