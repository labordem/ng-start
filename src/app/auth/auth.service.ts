import { HttpErrorResponse } from '@angular/common/http';
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
  readonly emailRegexp = /^(?=.{4,64}$)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  readonly usernameRegexp = /^(?=.{4,20}$)[a-z][a-z0-9]+(?:-[a-z0-9]+)?$/;
  readonly passwordRegexp = /^.{8,191}$/;

  constructor(
    private readonly userService: UserService // private readonly http: HttpClient
  ) {}

  signin$(authSigninInput: AuthSigninInput): Observable<AuthResponse> {
    if (
      authSigninInput.identifier !== 'johndoe' &&
      authSigninInput.identifier !== 'johndoe@test.com'
    ) {
      return throwError(
        new HttpErrorResponse({
          error: { message: 'incorrect username or email' },
        })
      );
    }

    if (authSigninInput.password !== 'johndoepass') {
      return throwError(
        new HttpErrorResponse({
          error: { message: 'incorrect password' },
        })
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
    } as AuthResponse).pipe(
      delay(2000),
      tap((res) => this.userService.update(res.user, res.jwt))
    );
  }

  signup$(authSignupInput: AuthSignupInput): Observable<User> {
    if (authSignupInput.email === 'johndoe@test.com') {
      return throwError(
        new HttpErrorResponse({
          error: { message: 'email already exists' },
        })
      );
    }

    if (authSignupInput.username === 'johndoe') {
      return throwError(
        new HttpErrorResponse({
          error: { message: 'username already exists' },
        })
      );
    }

    return of({
      id: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      username: authSignupInput.username,
      email: authSignupInput.email,
    } as User).pipe(
      delay(2000),
      tap((user) => this.userService.update(user))
    );
  }
}
