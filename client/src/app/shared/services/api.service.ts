import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { apiUrls } from '../constants/api-urls';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  public logIn (email: string, password: string): Observable<any> {
    return this.httpClient.post(apiUrls.login, { email, password });
  }

  public signUp (firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this.httpClient.post(apiUrls.singUp, { firstName, lastName, email, password });
  }

  public refreshToken(refreshToken: string): Observable<any> {
    return this.httpClient.post(apiUrls.refreshToken, { refreshToken });
  }
}
