import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../../../model/product';

@Component({
  selector: 'app-order-details',
  imports: [],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss'
})
export class OrderDetailsComponent {
  // public order$: Observable<Product[]>;
}
