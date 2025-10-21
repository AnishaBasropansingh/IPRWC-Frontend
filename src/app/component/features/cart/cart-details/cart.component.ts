import { Component } from '@angular/core';
import { CartService } from '../../../../service/cart/cart.service';
import { Product } from '../../../../model/product';
import {AsyncPipe, DecimalPipe} from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems$!: Observable<Product[]>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.getCartItems();
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
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
}
