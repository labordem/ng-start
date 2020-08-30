import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export interface User {
  id: number;
  created: Date;
  updated: Date;
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
  private readonly userSubject$: ReplaySubject<User>;

  constructor() {
    this.userSubject$ = new ReplaySubject<User>(1);
    this.setUser(this.getUserFromStorage());
  }

  getUser$(): Observable<User> {
    return this.userSubject$.asObservable();
  }

  setUser(value: User): void {
    this.userSubject$.next(value);
    localStorage.setItem('user', JSON.stringify(value));
  }

  deleteUser(): void {
    this.userSubject$.next(undefined);
    localStorage.removeItem('user');
  }

  getUserFromStorage(): User {
    return JSON.parse(localStorage.getItem('user') as string) as User;
  }
}
