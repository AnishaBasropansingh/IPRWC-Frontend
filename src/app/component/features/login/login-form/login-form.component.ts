import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../../../service/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login-form.component.html',
  imports: [FormsModule, RouterLink],
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  storedUsername: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.storedUsername = localStorage.getItem('username');
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onSubmit() {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Vul alle velden in.';
      return;
    }

    async function hashEmail(email: string): Promise<string> {
      const encoder = new TextEncoder();
      const data = encoder.encode(email);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    }


    this.authService.loginUser({
      username: this.username,
      email: this.email,
      password: this.password
    }).subscribe({
      next: async (response) => {
        if (isPlatformBrowser(this.platformId)) {
          const hashedEmail = await hashEmail(response.email);

          localStorage.setItem('token', response.token);
          localStorage.setItem('email', hashedEmail);
          localStorage.setItem('username', response.username);

          this.storedUsername = response.username;
        }

        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage = 'Ongeldige inloggegevens.';
      }
    });

  }
}
