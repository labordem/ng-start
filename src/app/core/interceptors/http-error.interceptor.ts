import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LogService } from '../services/log.service';

interface ServerSideError {
  message: [{ messages: [{ id: string }] }];
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private readonly logService: LogService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // tslint:disable-next-line: rxjs-no-implicit-any-catch
      catchError((err: HttpErrorResponse) => {
        let message = '';

        if (err.error instanceof ErrorEvent) {
          this.logService.info(
            'intercept',
            `${this.constructor.name} errorEvent`,
          );
          message = err?.error?.message;
        } else if (err.error instanceof ProgressEvent) {
          this.logService.info(
            'intercept',
            `${this.constructor.name} progressEvent`,
          );
          message = err.message;
        } else {
          this.logService.info(
            'intercept',
            `${this.constructor.name} serverSideError`,
          );
          message = (err.error as ServerSideError)?.message[0]?.messages[0]?.id;
        }

        return throwError(new Error(message));
      }),
    );
  }
}
