import { Injectable } from '@angular/core';
import { Product } from '../../model/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Product[]>(this.loadCartFromStorage());
  private stockMap: { [productId: number]: number } = this.loadStockFromStorage();

  constructor() {}

  getCartItems(): Observable<Product[]> {
    return this.cartSubject.asObservable();
  }

  addProduct(product: Product) {
    this.initProductStock(product);

    if (!this.inStock(product)) {
      console.warn(`Product "${product.name}" is niet op voorraad.`);
      return;
    }

    this.stockMap[product.product_id]--;
    this.saveStock();

    const cart = [...this.cartSubject.value, { ...product }];
    this.saveCart(cart);
  }
  removeProduct(productId: number) {
    const index = this.cartSubject.value.findIndex(p => p.product_id === productId);
    if (index !== -1) {
      const cart = [...this.cartSubject.value];
      const removed = cart.splice(index, 1)[0];
      this.saveCart(cart);

      if (removed && removed.product_id != null) {
        if (this.stockMap[productId] != null) {
          this.stockMap[productId]++;
        } else {
          this.stockMap[productId] = 1;
        }
        this.saveStock();
      }
    }
  }

  private initProductStock(product: Product) {
    if (!(product.product_id in this.stockMap)) {
      this.stockMap[product.product_id] = product.stock;
      this.saveStock();
    }
  }

  private saveStock() {
    localStorage.setItem('stockMap', JSON.stringify(this.stockMap));
  }

  private loadStockFromStorage(): { [productId: number]: number } {
    return JSON.parse(localStorage.getItem('stockMap') || '{}');
  }

  inStock(product: Product): boolean {
    this.initProductStock(product);
    return this.stockMap[product.product_id] > 0;
  }

  clearCart() {
    this.saveCart([]);
    this.stockMap = {};
    localStorage.removeItem('stockMap');
  }

  getStock(productId: number): number {
    return this.stockMap[productId] ?? 0;
  }

  private saveCart(cart: Product[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  private loadCartFromStorage(): Product[] {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }
}
