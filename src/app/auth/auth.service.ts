import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    return of({
      jwt: 'ey...',
      user: {
        id: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        username: 'johndoe',
        email: 'john.doe@kmail.com',
        isConfirmed: true,
      },
    } as AuthResponse).pipe(
      delay(2000),
      tap((res) => this.userService.update(res.user, res.jwt))
    );
  }

  signup$(authSignupInput: AuthSignupInput): Observable<User> {
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
