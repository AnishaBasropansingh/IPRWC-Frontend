import { Component } from '@angular/core';
import { Product } from '../../../../model/product';
import { ProductService } from '../../../../service/product/product.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {Observable, switchMap} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-admin-crud-product',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    RouterLink,
  ],
  templateUrl: './admin-crud-product.component.html',
  styleUrls: ['./admin-crud-product.component.scss']
})
export class AdminCrudProductComponent {
  products$!: Observable<Product[]>;
  selectedProduct?: Product;
  errorMessage = '';

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products$ = this.productService.getProducts();
  }

  selectProduct(product: Product): void {
    this.selectedProduct = { ...product };
  }

  addProduct(newProduct: Product): void {
    this.productService.addProduct(newProduct).subscribe({
      next: () => this.loadProducts(),
      error: () => this.errorMessage = 'Kan geen producten toevoegen :('
    });
  }

  // updateProduct(product: Product) {
  //   this.products$ = this.products$.pipe(
  //     switchMap(products =>
  //       this.productService.updateProduct(product).pipe(
  //         map(updatedProduct => {
  //           return products.map(p => p.product_id === updatedProduct.product_id ? updatedProduct : p);
  //         })
  //       )
  //     )
  //   );
  // }

  deleteProduct(product_id: number) {
    this.products$ = this.products$.pipe(
      map(products => {
        this.productService.deleteProduct(product_id).subscribe({
          error: () => this.errorMessage = 'Mag niet verwijderen :('
        });
        return products.filter(p => p.product_id !== product_id);
      })
    );
  }

  getProduct(product_id: number): void {
    this.productService.getProductById(product_id).subscribe({
      next: (data) => this.selectedProduct = data,
      error: () => this.errorMessage = 'Kan niet alle producten inladen :('
    });
  }

}
