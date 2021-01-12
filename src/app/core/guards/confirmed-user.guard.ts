import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LogService } from '../services/log.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ConfirmedUserGuard implements CanActivate {
  constructor(
    private readonly logService: LogService,
    private readonly router: Router,
    private readonly userService: UserService,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userService.user$.pipe(
      map((user) => {
        const isConfirmed = user?.isConfirmed ?? false;
        if (!isConfirmed) {
          this.logService.info('guard', this.constructor.name);

          return this.router.parseUrl('/auth/confirm-email');
        }

        return true;
      }),
    );
  }
}
