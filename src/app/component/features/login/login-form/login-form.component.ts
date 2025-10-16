import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../service/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login-form.component.html',
  imports: [FormsModule],
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  storedEmail: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.storedEmail = localStorage.getItem('email');
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onSubmit() {
    if (this.email && this.password) {
      const user = { email: this.email, password: this.password };
      this.authService.loginUser(user).subscribe({
        next: (response) => {
          console.log('Inloggen gelukt:', response);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('email', response.email);
            this.storedEmail = response.email;
          }
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login mislukt:', error);
          this.errorMessage = 'Ongeldige inloggegevens.';
        }
      });
    } else {
      this.errorMessage = 'Vul alle velden in.';
    }
  }

  logout() {
    this.authService.logout();
    this.storedEmail = null;
    this.router.navigate(['/']);
  }
}
