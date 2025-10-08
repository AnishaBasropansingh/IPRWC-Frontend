import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Home} from './page/home/home';
import {Navbar} from './component/shared/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('webshop-frontend');
}
