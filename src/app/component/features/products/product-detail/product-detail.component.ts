import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../model/product';
import {ProductService} from '../../../../service/product/product.service';
import {ActivatedRoute} from '@angular/router';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  public product: Product | null = null;

  constructor(private productService: ProductService, protected route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // haal id uit url
    if (id) {
      this.getProductById(+id); // +id --> zet string om naar number
    }
  }

  private getProductById(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (response) => (this.product = response),
      error: (err) => err,
    });
  }
}
