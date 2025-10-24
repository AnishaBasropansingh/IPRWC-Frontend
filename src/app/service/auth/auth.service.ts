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

  public loginUser(user: { username?: string; email: string; password: string; }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiServerUrl}/auth/login`, user)
      .pipe(
        tap(response => {
          this.saveUser({
            id: response.id,
            username: response.username,
            email: response.email,
            role: response.role,
            token: response.token
          });
        })
      );
  }

  public registerUser(user: { username: string; email: string; password: string }): Observable<any> {
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

  getUser(): any | null {

    if (!isPlatformBrowser(this.platformId)) return null;
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;

  }

  public getUserId(): number | null {
    const user = this.getUser();
    return user?.id ?? null;
  }


  public getToken(): string | null {
    return this.getUser()?.token ?? null;
  }

  public getUserRole(): string | null {
    return this.getUser()?.role ?? null;
  }

  async saveUser(user: any): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {

      const encoder = new TextEncoder();
      const data = encoder.encode(user.email);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      const userToSave = { ...user, email: hashHex };

      localStorage.setItem('user', JSON.stringify(userToSave));
    }
  }
}
