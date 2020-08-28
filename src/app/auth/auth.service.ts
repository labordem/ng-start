import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { User } from '../core/user.service';

export interface AuthSigninInput {
  email: string;
  password: string;
}

export interface AuthSignupInput extends AuthSigninInput {
  username: string;
}

export interface Validation {
  regexp: RegExp;
  message: string;
}

export const validEmail: Validation = {
  regexp: /^(?=.{4,64}$)[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  message: 'must be an email',
};

export const validUsername: Validation = {
  regexp: /^(?=.{4,20}$)[a-z][a-z0-9]+(?:-[a-z0-9]+)?$/,
  message: 'must contains 4-20 alphanumerics characters',
};

export const validPassword: Validation = {
  regexp: /^.{8,191}$/,
  message: 'must contains 8-191 characters',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signin$(authSigninInput: AuthSigninInput): Observable<User> {
    return of({
      id: 0,
      created: new Date(),
      updated: new Date(),
      username: 'johndoe',
      email: 'john@doe.com',
      avatar: undefined,
      isConfirmed: true,
    } as User).pipe(delay(2000));
  }

  signup$(authSignupInput: AuthSignupInput): Observable<User> {
    return of({
      id: 0,
      created: new Date(),
      updated: new Date(),
      username: authSignupInput.username,
      email: authSignupInput.email,
      avatar: undefined,
      isConfirmed: true,
    } as User).pipe(delay(2000));
  }
}
