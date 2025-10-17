import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.authService.getUserRole();
    if (userRole?.toUpperCase() === 'ROLE_ADMIN') {
      return true;
    }
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
