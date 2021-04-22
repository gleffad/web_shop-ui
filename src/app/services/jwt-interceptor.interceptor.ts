import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url !== 'http://localhost:8000/token/') {
      const token = localStorage.getItem('access_token');
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
      return next.handle(request);
    }
  }

}
