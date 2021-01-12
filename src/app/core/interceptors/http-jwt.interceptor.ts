import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LogService } from '../services/log.service';
import { UserService } from '../services/user.service';

@Injectable()
export class HttpJwtInterceptor implements HttpInterceptor {
  constructor(
    private readonly userService: UserService,
    private readonly logService: LogService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const jwt = this.userService.jwt;
    let newRequest = request;
    if (jwt !== undefined) {
      newRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${jwt}` },
      });
      this.logService.info(
        'intercept',
        `${this.constructor.name} jwt added to request`,
      );
    }

    return next.handle(newRequest).pipe(
      tap(
        () => {},
        (err: unknown) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.logService.info(
                'intercept',
                `${this.constructor.name} 401 forbidden`,
              );
              this.userService.delete();
            }
          }
        },
      ),
    );
  }
}
