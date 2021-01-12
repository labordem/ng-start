import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LogService } from '../services/log.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(
    private readonly logService: LogService,
    private readonly router: Router,
    private readonly userService: UserService,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    const jwt = this.userService.jwt;

    return this.userService.user$.pipe(
      map((user) => {
        if (jwt === undefined || user === undefined) {
          this.logService.info('guard', this.constructor.name);

          return this.router.parseUrl('/auth');
        }

        return true;
      }),
    );
  }
}
