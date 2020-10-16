import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  email: string;
  avatar?: string;
  isConfirmed?: boolean;
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

  constructor() {
    this.init();
  }

  update(user: User, jwt?: string): User {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    console.info(`💾 update: ${this.userKey}`);
    this.userSubject$.next(user);

    if (jwt !== undefined) {
      localStorage.setItem(this.jwtKey, jwt);
      console.info(`💾 update: ${this.jwtKey}`);
      this.jwt = jwt;
    }

    return user;
  }

  delete(): void {
    localStorage.removeItem(this.userKey);
    console.info(`💾 delete: ${this.userKey}`);
    this.userSubject$.next(undefined);

    localStorage.removeItem(this.jwtKey);
    console.info(`💾 delete: ${this.jwtKey}`);
    this.jwt = undefined;
  }

  private init(): void {
    const userString = localStorage.getItem(this.userKey) as string;
    const user = (JSON.parse(userString) as User) ?? undefined;
    this.userSubject$.next(user);
    this.jwt = localStorage.getItem(this.jwtKey) ?? undefined;
  }
}
