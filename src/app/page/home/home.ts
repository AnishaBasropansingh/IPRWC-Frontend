import { Component } from '@angular/core';
import {HomeHeaderComponent} from '../../component/features/home/home-header/home-header.component';

@Component({
  selector: 'app-home',
  imports: [
    HomeHeaderComponent,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
