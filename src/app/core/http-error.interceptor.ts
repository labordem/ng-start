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

interface ServerSideError {
  message: [{ messages: [{ id: string }] }];
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // tslint:disable-next-line: rxjs-no-implicit-any-catch
      catchError((err: HttpErrorResponse) => {
        let message = '';

        if (err.error instanceof ErrorEvent) {
          console.info('🎾 intercept: http errorEvent');
          message = err?.error?.message;
        } else if (err.error instanceof ProgressEvent) {
          console.info('🎾 intercept: http progressEvent');
          message = err.message;
        } else {
          console.info('🎾 intercept: server error response');
          message = (err.error as ServerSideError)?.message[0]?.messages[0]?.id;
        }

        return throwError(new Error(message));
      })
    );
  }
}
