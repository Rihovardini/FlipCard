import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from "@auth0/angular-jwt";
import { tap } from 'rxjs/operators';

import { ApiService } from './api.service';
import { Tokens } from '../constants/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelperService = new JwtHelperService();

  constructor(private apiService: ApiService, private router: Router) { }

  public logIn(email: string, passsword: string): any {
    return this.apiService.logIn(email, passsword).pipe(
      tap(response => this.saveTokens(response.accessToken, response.refreshToken))
    );
  }

  public signUp(firstName: string, lastName: string, email: string, passsword: string): any {
    return this.apiService.signUp(firstName, lastName, email, passsword).pipe(
      tap(response => this.saveTokens(response.accessToken, response.refreshToken))
    );
  }

  public refreshToken(): any {
    const refreshToken = this.getToken(Tokens.refreshToken);

    return this.apiService.refreshToken(refreshToken).pipe(
      tap(response => this.saveTokens(response.accessToken, response.refreshToken))
    );
  }

  public logOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    const refreshToken = this.getToken(Tokens.refreshToken);

    if (!refreshToken) return false;

    const isExpired = this.jwtHelperService.isTokenExpired(refreshToken);

    return !isExpired;
  }
 
  public getUserInfo(): any {
    const accessToken = this.getToken(Tokens.accessToken);
    
    return accessToken ?  this.jwtHelperService.decodeToken(accessToken) : null;
  }

  public getToken(key: string): string {
    return localStorage.getItem(key);
  }

  private saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(Tokens.accessToken, accessToken);
    localStorage.setItem(Tokens.refreshToken, refreshToken);
  }
}
