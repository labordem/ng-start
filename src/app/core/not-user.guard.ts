import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class NotUserGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userService.user$.pipe(
      map((user) => {
        if (user === undefined) {
          return true;
        }

        return this.router.parseUrl('/');
      })
    );
  }
}
