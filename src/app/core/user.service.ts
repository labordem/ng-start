import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  email: string;
  avatar?: string;
  confirmed?: boolean;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userKey = 'user';
  private readonly jwtKey = 'jwt';
  private readonly userSubject$ = new ReplaySubject<User | undefined>(1);
  user$ = this.userSubject$.asObservable();
  jwt: string | undefined;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router
  ) {
    const user = this.localStorageService.getItemInStorage(this.userKey) as
      | User
      | undefined;
    this.userSubject$.next(user);
    const jwt = this.localStorageService.getItemInStorage(this.jwtKey) as
      | string
      | undefined;
    this.jwt = jwt;
  }

  update(user: User, jwt?: string): User {
    this.localStorageService.setItemInStorage(this.userKey, user);
    this.userSubject$.next(user);

    if (jwt !== undefined) {
      this.localStorageService.setItemInStorage(this.jwtKey, jwt);
      this.jwt = jwt;
    }

    return user;
  }

  delete(): void {
    this.localStorageService.removeItemInStorage(this.userKey);
    this.userSubject$.next(undefined);
    this.localStorageService.removeItemInStorage(this.jwtKey);
    this.jwt = undefined;
    this.router.navigate(['/auth']);
  }
}
