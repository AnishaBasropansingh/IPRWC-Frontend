import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth/auth.service';
import {NgOptimizedImage} from '@angular/common';
import {StoredEmailPipe} from '../../../pipe/email.pipe'; // pas pad aan!

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, StoredEmailPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  menuOpen: boolean = false;
  constructor(
    protected authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}

