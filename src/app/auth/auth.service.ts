import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, switchMap, tap } from 'rxjs/operators';

import { User, UserService } from '../core/user.service';

export interface SigninInput {
  identifier: string;
  password: string;
}

export interface SignupInput {
  email: string;
  username: string;
  password: string;
}

export interface AuthOutput {
  jwt: string;
  user: User;
}

export interface RequestResetPasswordTokenInput {
  email: string;
}

export interface ResetPasswordInput {
  password: string;
}

export interface TokenInput {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly http: HttpClient
  ) {}

  signin$(input: SigninInput): Observable<AuthOutput> {
    // // Strapi ready signin method :
    // return this.http
    //   .post<AuthResponse>(`${environment.apiUrl}/auth/local`, authSigninInput)
    //   .pipe(tap((res) => this.userService.update(res.user, res.jwt)));

    if (
      input.identifier.toLowerCase() !== 'johndoe' &&
      input.identifier.toLowerCase() !== 'johndoe@test.com'
    ) {
      return of(undefined).pipe(
        delay(2000),
        switchMap(() => throwError(new Error('Auth.form.identifier.invalid')))
      );
    }
    if (input.password !== 'johndoepass') {
      return of(undefined).pipe(
        delay(2000),
        switchMap(() => throwError(new Error('Auth.form.password.invalid')))
      );
    }

    return of({
      jwt: 'ey...',
      user: {
        id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        username: 'johndoe',
        email: 'johndoe@test.com',
        isConfirmed: true,
      },
    } as AuthOutput).pipe(
      delay(2000),
      tap((res) => this.userService.update(res.user, res.jwt))
    );
  }

  signup$(input: SignupInput): Observable<AuthOutput> {
    // // Strapi ready signup method :
    // return this.http
    //   .post<AuthResponse>(
    //     `${environment.apiUrl}/auth/local/register`,
    //     authSignupInput
    //   )
    //   .pipe(tap((res) => this.userService.update(res.user, res.jwt)));

    if (input.email.toLowerCase() === 'johndoe@test.com') {
      return of(undefined).pipe(
        delay(2000),
        switchMap(() => throwError(new Error('Auth.form.error.email.taken')))
      );
    }
    if (input.username.toLowerCase() === 'johndoe') {
      return of(undefined).pipe(
        delay(2000),
        switchMap(() => throwError(new Error('Auth.form.error.username.taken')))
      );
    }

    return of({
      jwt: 'ey...',
      user: {
        id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        username: input.username,
        email: input.email,
        isConfirmed: false,
      },
    } as AuthOutput).pipe(
      delay(2000),
      tap((res) => this.userService.update(res.user, res.jwt))
    );
  }

  requestConfirmEmailToken$(input: User): Observable<unknown> {
    // // TODO: Strapi ready method

    return of({} as unknown).pipe(delay(2000));
  }

  verifyConfirmEmailToken$(input: TokenInput): Observable<AuthOutput> {
    // // TODO: Strapi ready method

    if (input.token !== 'johndoeToken') {
      return of(undefined).pipe(
        delay(2000),
        switchMap(() => throwError(new Error('Auth.form.identifier.invalid')))
      );
    }

    return of({
      jwt: 'ey...',
      user: {
        id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        username: 'johndoe',
        email: 'johndoe@test.com',
        isConfirmed: true,
      },
    } as AuthOutput).pipe(
      delay(2000),
      tap((res) => this.userService.update(res.user, res.jwt))
    );
  }

  requestResetPasswordToken$(
    input: RequestResetPasswordTokenInput
  ): Observable<unknown> {
    // // Strapi ready signin method :
    // return this.http
    //   .post<AuthResponse>(`${environment.apiUrl}/auth/forgot-password`, authForgotPasswordInput)

    if (input.email.toLowerCase() !== 'johndoe@test.com') {
      return of(undefined).pipe(
        delay(2000),
        switchMap(() => throwError(new Error('Auth.form.error.user.not-exist')))
      );
    }

    return of({} as AuthOutput).pipe(delay(2000));
  }

  verifyResetPasswordToken$(input: TokenInput): Observable<unknown> {
    // // TODO: Strapi ready method

    if (input.token !== 'johndoe') {
      return of(undefined).pipe(
        delay(2000),
        switchMap(() => throwError(new Error('Auth.form.identifier.invalid')))
      );
    }

    return of({} as unknown).pipe(delay(2000));
  }

  setNewPassword$(input: ResetPasswordInput): Observable<unknown> {
    // // TODO: Strapi ready method

    return of({} as unknown).pipe(delay(2000));
  }
}
