import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtTokenService } from './_services/jwt-token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private jwtTokenService: JwtTokenService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers.set(
        'authorization',
        `Bearer ${this.jwtTokenService.token}`
      ),
    });

    return next.handle(request);
  }
}
