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
      catchError((error: HttpErrorResponse) => {
        let message = '';

        if (error.error instanceof ErrorEvent) {
          console.info('🎾 intercept: http client side error');
          message = error?.error?.message;
        } else if (error.error instanceof ProgressEvent) {
          console.info('🎾 intercept: http server not responding');
          message = error.message;
        } else {
          console.info('🎾 intercept: http server side error');
          message = (error.error as ServerSideError)?.message[0]?.messages[0]
            ?.id;
        }

        return throwError(new Error(message));
      })
    );
  }
}
