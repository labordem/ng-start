import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  created: Date;
  updated: Date;
  username: string;
  email: string;
  avatar?: string;
  isConfirmed?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userSubject$: BehaviorSubject<User>;

  constructor() {
    this.userSubject$ = new BehaviorSubject(
      // MOCK data - replace it by getUserFromStorage(); when auth system ready
      {
        id: 0,
        created: new Date(),
        updated: new Date(),
        username: 'johndoe',
        email: 'john@doe.com',
        avatar: undefined,
        isConfirmed: true,
      } as User
    );
  }

  getUser$(): Observable<User> {
    return this.userSubject$.asObservable();
  }

  setUser(value: User): void {
    this.userSubject$.next(value);
    localStorage.setItem('user', JSON.stringify(value));
  }

  deleteUser(): void {
    this.userSubject$.complete();
    localStorage.removeItem('user');
  }

  private getUserFromStorage(): User {
    return JSON.parse(localStorage.getItem('user') as string) as User;
  }
}
