import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-header',
  imports: [],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.scss'
})
export class HomeHeaderComponent {
  constructor(private router: Router) {}

  goToProducts() {
    this.router.navigate(['/product']);
  }

  goToAbout() {
    this.router.navigate(['/about']);
  }

}
