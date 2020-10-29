import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { User, UserService } from '../core/user.service';

export interface AuthSigninInput {
  identifier: string;
  password: string;
}

export interface AuthSignupInput {
  email: string;
  username: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly http: HttpClient
  ) {}

  signin$(authSigninInput: AuthSigninInput): Observable<AuthResponse> {
    // // Strapi ready signin method :
    // return this.http
    //   .post<AuthResponse>(`${environment.apiUrl}/auth/local`, authSigninInput)
    //   .pipe(tap((res) => this.userService.update(res.user, res.jwt)));

    if (
      authSigninInput.identifier !== 'johndoe' &&
      authSigninInput.identifier !== 'johndoe@test.com'
    ) {
      return throwError(new Error('Auth.form.identifier.invalid'));
    }
    if (authSigninInput.password !== 'johndoepass') {
      return throwError(new Error('Auth.form.password.invalid'));
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
    } as AuthResponse).pipe(
      delay(2000),
      tap((res) => this.userService.update(res.user, res.jwt))
    );
  }

  signup$(authSignupInput: AuthSignupInput): Observable<AuthResponse> {
    // // Strapi ready signup method :
    // return this.http
    //   .post<AuthResponse>(
    //     `${environment.apiUrl}/auth/local/register`,
    //     authSignupInput
    //   )
    //   .pipe(tap((res) => this.userService.update(res.user, res.jwt)));

    if (authSignupInput.email === 'johndoe@test.com') {
      return throwError(new Error('Auth.form.error.email.taken'));
    }
    if (authSignupInput.username === 'johndoe') {
      return throwError(new Error('Auth.form.error.username.taken'));
    }

    return of({
      jwt: 'ey...',
      user: {
        id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        username: authSignupInput.username,
        email: authSignupInput.email,
        isConfirmed: false,
      },
    } as AuthResponse).pipe(
      delay(2000),
      tap((res) => this.userService.update(res.user, res.jwt))
    );
  }
}
