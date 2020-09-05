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
  private readonly userSubject$ = new ReplaySubject<User | undefined>(1);
  user$ = this.userSubject$.asObservable();

  constructor() {
    this.init();
  }

  update(user: User): User {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userSubject$.next(user);

    return user;
  }

  delete(): void {
    localStorage.removeItem(this.userKey);
    this.userSubject$.next(undefined);
  }

  private init(): void {
    const userString = localStorage.getItem(this.userKey) as string;
    const user = (JSON.parse(userString) as User) ?? undefined;
    this.userSubject$.next(user);
  }
}
