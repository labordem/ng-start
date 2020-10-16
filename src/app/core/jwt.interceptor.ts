import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from './user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private readonly userService: UserService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const jwt = this.userService.jwt;

    if (jwt !== undefined) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${jwt}`,
      });
      const requestWithJwt = request.clone({ headers });
      console.info('🔑 intercept: jwt added to request');

      return next.handle(requestWithJwt);
    }

    return next.handle(request);
  }
}
