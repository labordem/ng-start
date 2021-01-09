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

import { UserService } from '../services/user.service';

@Injectable()
export class HttpJwtInterceptor implements HttpInterceptor {
  constructor(private readonly userService: UserService) {}

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
      console.info('🎾 intercept: jwt added to request');
    }

    return next.handle(newRequest).pipe(
      tap(
        () => {},
        (err: unknown) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              console.info('🎾 intercept: 401 error, user deleted');
              this.userService.delete();
            }
          }
        },
      ),
    );
  }
}
