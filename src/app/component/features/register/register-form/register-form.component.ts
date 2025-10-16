import { Component, Inject, PLATFORM_ID } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../../../service/auth/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register-form.component.html',
  imports: [FormsModule, RouterLink],
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Vul alle velden in.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Wachtwoorden komen niet overeen.';
      return;
    }

    this.authService.registerUser({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Registratie gelukt:', response);
        this.successMessage = 'Registratie gelukt! Je kunt nu inloggen.';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (error) => {
        console.error('Registratie mislukt:', error);
        this.errorMessage = 'Registratie mislukt. Probeer het opnieuw.';
      }
    });
  }
}
