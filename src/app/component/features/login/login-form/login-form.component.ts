import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../../../service/auth/auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login-form.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  protected readonly localStorage = localStorage;
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onSubmit() {
    if (this.email && this.password) {
      const user: { email: string; password: string } = { email: this.email, password: this.password };
      this.authService.loginUser(user).subscribe({
        next: (response) => {
          console.log('Inloggen gelukt:', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('email', response.email);
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
    this.router.navigate(['/']);
  }


}
