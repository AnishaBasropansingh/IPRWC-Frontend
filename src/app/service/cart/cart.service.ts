import { Injectable } from '@angular/core';
import { Product } from '../../model/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Product[]>(this.loadCartFromStorage());

  getCartItems(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  addProduct(product: Product) {
    const cart = [...this.cartSubject.value, product];
    this.saveCart(cart);
  }

  removeProduct(productId: number) {
    const index = this.cartSubject.value.findIndex(p => p.product_id === productId);
    if (index !== -1) {
      const cart = [...this.cartSubject.value];
      cart.splice(index, 1);
      this.saveCart(cart);
    }
  }

  clearCart() {
    this.saveCart([]);
  }

  private saveCart(cart: Product[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  private loadCartFromStorage(): Product[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
}
