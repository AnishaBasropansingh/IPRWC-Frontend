import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../service/auth/auth.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userRole = this.authService.getUserRole();
    console.log('UserGuard: userRole =', userRole);

    if (userRole?.toUpperCase() === 'ROLE_USER' || userRole?.toUpperCase() === 'ROLE_ADMIN') {
      console.log('Access granted');
      return true;
    }

    console.log('Access denied');
    this.router.navigate(['/unauthorized']);
    return false;
  }
}
