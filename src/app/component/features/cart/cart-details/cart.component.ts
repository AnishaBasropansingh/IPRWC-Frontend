import { Component } from '@angular/core';
import { CartService } from '../../../../service/cart/cart.service';
import { OrderService } from '../../../../service/checkout/order.service';
import { AuthService } from '../../../../service/auth/auth.service';
import { Product } from '../../../../model/product';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import {BehaviorSubject, Observable, take} from 'rxjs';
import { Router } from '@angular/router';
import {OrderDTO} from '../../../../model/OrderDTO';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems$!: Observable<Product[]>;
  private cartSubject = new BehaviorSubject<Product[]>(this.loadCart());

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.cartItems$ = this.cartService.getCartItems();
  }

  private loadCart(): Product[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  removeFromCart(productId: number) {
    this.cartService.removeProduct(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }


  getTotal(cartItems: Product[]): number {
    return cartItems.reduce((sum, item) => sum + item.price, 0);
  }

checkout() {
  this.cartItems$.pipe(take(1)).subscribe(cartItems => {
    if (cartItems.length === 0) {
      alert('Je winkelwagen is leeg!');
      return;
    }

    const order = {
      user_id: this.authService.getUserId(),
      product_id: cartItems.map(p => p.product_id),
      totalPrice: this.getTotal(cartItems),
      orderDate: new Date().toISOString()
    };

    this.orderService.createOrder(order).subscribe({
      next: () => {
        alert('Bestelling succesvol geplaatst!');
        this.cartService.clearCart();
        this.router.navigate(['/order']);
      },
      error: (err) => {
        console.error(err);
        alert('Er is iets misgegaan bij het plaatsen van de bestelling.');
      }
    });
  });
}

}
