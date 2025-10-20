import { Component } from '@angular/core';
import { Product } from '../../../../model/product';
import { ProductService } from '../../../../service/product/product.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

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
  errorMessage = '';

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products$ = this.productService.getProducts();
  }

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
}
