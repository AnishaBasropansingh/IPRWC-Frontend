import { Component } from '@angular/core';
import {Navbar} from '../../component/shared/navbar/navbar';
import {HomeHeaderComponent} from '../../component/features/home/home-header/home-header.component';
import {ProductComponent} from '../product/product.component';

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
