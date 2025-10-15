import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LoginResponse} from '../../model/LoginResponse';

@Injectable({
  providedIn: 'root'

})
export class AuthService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public loginUser(user: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiServerUrl}/auth/login`, user);
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  public isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('token');
  }
}


