import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ConfirmedUserGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userService.user$.pipe(
      map((user) => {
        const confirmed = user?.confirmed ?? false;
        if (!confirmed) {
          console.info(`⚔️ guard: ${this.constructor.name}`);

          return this.router.parseUrl('/auth/confirm-email');
        }

        return true;
      })
    );
  }
}
