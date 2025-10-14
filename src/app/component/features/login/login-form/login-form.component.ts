import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-form',
  imports: [
    FormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  email = '';
  password = '';
  errorMessage = '';

  onSubmit() {
    if (this.email && this.password) {
      console.log('Inloggen met:', this.email, this.password);
      // AUTHSERVICE call toevoegen
    } else {
      this.errorMessage = 'Vul alle velden in.';
    }
  }
}
