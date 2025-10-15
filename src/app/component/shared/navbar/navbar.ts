import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import {AuthService} from '../../../service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

  constructor(protected authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
