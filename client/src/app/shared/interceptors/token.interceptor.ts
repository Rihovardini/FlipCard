import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Tokens } from '../constants/token';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private refreshingInProgress: boolean;
  private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  
  constructor(private authService: AuthService) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getToken(Tokens.accessToken);

    const requestWithToken = this.addAuthorizationHeader(request, accessToken);

    return next.handle(requestWithToken).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          const refreshToken = this.authService.getToken(Tokens.refreshToken);

          if (accessToken && refreshToken) {
            return this.getRefreshToken(request, next);
          }
        }

        return this.logoutAndRedirect(error);
      })
    );
  }

  private addAuthorizationHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }

    return request;
  }

  private getRefreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.refreshingInProgress) {
      this.refreshingInProgress = true;
      this.accessTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((response: any) => {
          this.refreshingInProgress = false;
          this.accessTokenSubject.next(response.accessToken);

          return next.handle(this.addAuthorizationHeader(request, response.accessToken));
        })
      );
    } else {

      return this.accessTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {

          return next.handle(this.addAuthorizationHeader(request, token));
        }));
    }
  }

  private logoutAndRedirect(err): Observable<HttpEvent<any>> {
    this.authService.logOut();

    return throwError(err);
  }
}
