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
    const counts = new Map<number, { product: Product, quantity: number }>();

    products.forEach(p => {
      const existing = counts.get(p.product_id);
      if (existing) {
        existing.quantity++;
      } else {
        counts.set(p.product_id, { product: p, quantity: 1 });
      }
    });

    return Array.from(counts.values());
  }
  }
