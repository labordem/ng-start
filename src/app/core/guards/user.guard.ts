import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const jwt = this.userService.jwt;

    return this.userService.user$.pipe(
      map((user) => {
        if (jwt === undefined || user === undefined) {
          return this.router.parseUrl('/auth');
        }

        return true;
      })
    );
  }
}
