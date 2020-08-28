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
import { User, UserService } from 'src/app/core/user.service';

import {
  AuthService,
  AuthSignupInput,
  validEmail,
  validPassword,
  validUsername,
} from '../auth.service';
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
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {
    this.formGroup = this.initFormGroup();
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

  submit(formGroup: FormGroup): Subscription {
    const authSignupInput: AuthSignupInput = {
      username: formGroup.get('username')?.value as string,
      email: formGroup.get('email')?.value as string,
      password: formGroup.get('password')?.value as string,
    };
    this.errorMessage = '';
    this.hidePassword = true;
    this.isLoading = true;
    this.formGroup.disable();

    return this.authService
      .signup$(authSignupInput)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe({
        next: async (user: User) => {
          this.userService.setUser(user);
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
    console.info('💥 component detroyed');
    this.isDestroyed$.next(true);
    this.isDestroyed$.complete();
  }

  private initFormGroup(): FormGroup {
    return this.formBuilder.group(
      // tslint:disable
      {
        username: [
          undefined,

          [Validators.required, Validators.pattern(validUsername.regexp)],
        ],
        email: [
          null,
          [Validators.required, Validators.pattern(validEmail.regexp)],
        ],
        password: [
          null,
          [Validators.required, Validators.pattern(validPassword.regexp)],
        ],
        confirmPassword: [null, [Validators.required]],
      },
      {
        validators: [
          this.mustMatchValidator('password', 'confirmPassword'),
          this.mustNotBeRejectedValidator(),
        ],
      }
      // tslint:enable
    );
  }

  private mustMatchValidator(
    controlName: string,
    matchingControlName: string
  ): (formGroup: FormGroup) => void {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      // Another validator has already found an error on the matchingControl
      if (
        matchingControl.errors !== null &&
        !matchingControl.errors.mustMatch
      ) {
        return;
      }
      // set error on matchingControl if validation fails
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
