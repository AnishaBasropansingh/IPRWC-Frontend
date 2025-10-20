import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { LoginResponse } from '../../model/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public loginUser(user: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiServerUrl}/auth/login`, user)
      .pipe(
        tap(response => {
          this.saveUser({
            id: response.id,
            email: response.email,
            role: response.role,
            token: response.token
          });
        })
      );
  }

  public registerUser(user: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiServerUrl}/auth/register`, user);
  }

  public logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private getUser(): any | null {

    if (!isPlatformBrowser(this.platformId)) return null;
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;

  }

  public getToken(): string | null {
    return this.getUser()?.token ?? null;
  }

  public getUserRole(): string | null {
    return this.getUser()?.role ?? null;
  }


  public saveUser(user: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
}
