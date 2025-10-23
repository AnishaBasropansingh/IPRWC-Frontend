import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../model/order';
import { OrderService } from '../../service/checkout/order.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import {Product} from '../../model/product';
import {AuthService} from '../../service/auth/auth.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, AsyncPipe, CurrencyPipe],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public orders$: Observable<Order[]>;

  constructor(private orderService: OrderService, private authService: AuthService) {
    this.orders$ = this.orderService.getOrders();
  }

  ngOnInit(): void {  }

  getProductCounts(products: Product[]): { product: Product, quantity: number }[] {
    const counts: { [key: number]: { product: Product, quantity: number } } = {};

    products.forEach(p => {
      if (!counts[p.product_id]) {
        counts[p.product_id] = { product: p, quantity: 0 };
      }
      counts[p.product_id].quantity++;
    });

    return Object.values(counts);
  }
}
