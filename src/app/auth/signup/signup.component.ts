import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
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

import { AuthService, AuthSignupInput } from '../auth.service';
import { DialogCheckMailboxComponent } from '../dialog-check-mailbox/dialog-check-mailbox.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupComponent implements OnDestroy {
  formGroup: FormGroup;
  errorMessage = '';
  hidePassword = true;
  isLoading = false;
  private readonly isDestroyed$ = new Subject<boolean>();

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {
    this.formGroup = this.createFormGroup('submit');
  }

  get email(): AbstractControl | null {
    return this.formGroup.get('email');
  }

  get password(): AbstractControl | null {
    return this.formGroup.get('password');
  }

  get username(): AbstractControl | null {
    return this.formGroup.get('username');
  }

  get confirmPassword(): AbstractControl | null {
    return this.formGroup.get('confirmPassword');
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
    const authSignupInput: AuthSignupInput = {
      username: this.username?.value as string,
      email: this.email?.value as string,
      password: this.password?.value as string,
    };
    this.errorMessage = '';
    this.hidePassword = true;
    this.isLoading = true;
    this.formGroup.disable();

    return this.authService
      .signup$(authSignupInput)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe({
        next: async () => {
          const dialog = this.dialog.open(DialogCheckMailboxComponent);
          await dialog.afterClosed().toPromise();
          this.router.navigate(['/home']);
        },
        error: (err: string) => {
          this.errorMessage = err;
          this.isLoading = false;
          this.formGroup.enable();
        },
      });
  }

  onCloseDialog(): Promise<boolean> {
    this.dialog.closeAll();

    return this.router.navigate(['home']);
  }

  hasError(inputName: string, errorChecked: string): boolean {
    return this.formGroup.get(inputName)?.hasError(errorChecked) ?? false;
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
        username: [
          null,
          [
            Validators.required,
            Validators.pattern(this.authService.usernameRegexp),
          ],
        ],
        email: [
          null,
          [
            Validators.required,
            Validators.pattern(this.authService.emailRegexp),
          ],
        ],
        password: [
          null,
          [
            Validators.required,
            Validators.pattern(this.authService.passwordRegexp),
          ],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        updateOn,
        validators: [
          this.mustMatchValidator('password', 'confirmPassword'),
          this.mustNotBeRejectedValidator(),
        ],
      }
      // tslint:enable
    );

    if (previousValue !== undefined) {
      formGroup.setValue(previousValue);
    }

    return formGroup;
  }

  private mustMatchValidator(
    controlName: string,
    matchingControlName: string
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

  private mustNotBeRejectedValidator(): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      if (this.errorMessage === 'email already exists') {
        formGroup.controls.email.setErrors({ mustNotBeRejected: true });
        this.errorMessage = $localize`:@@please-choose-another-email:Please choose another email`;
      }
      if (this.errorMessage === 'username already exists') {
        formGroup.controls.username.setErrors({ mustNotBeRejected: true });
        this.errorMessage = $localize`:@@please-choose-another-username:Please choose another username`;
      }

      return;
    };
  }
}
