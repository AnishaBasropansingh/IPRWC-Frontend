import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../../service/product/product.service';
import {FormsModule} from '@angular/forms';
import {CreateProduct} from '../../../../model/createProduct';

@Component({
  selector: 'app-create-product',
  standalone: true,
  templateUrl: './admin-create-product-form.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./admin-create-product-form.component.scss']
})
export class AdminCreateProductFormComponent {
  name = '';
  description = '';
  price: number | null = null;
  stock: number | null = null;
  categorie_id: number | null = null;
  categorie_name = '';
  imageUrl = '';
  error = '';
  success = '';

  constructor(private productService: ProductService, private router: Router) {}

  submit() {
    if (!this.name || !this.description || !this.price || !this.stock || !this.categorie_id ) {
      this.error = 'Alle velden zijn verplicht.';
      return;
    }

    const newProduct: CreateProduct = {
      name: this.name,
      description: this.description,
      price: Number(this.price),
      stock: Number(this.stock),
      categorie_id: Number(this.categorie_id)
    };

    this.productService.addProduct(newProduct).subscribe({
      next: () => this.router.navigate(['/product']),
      error: err => console.error('Error creating product:', err)
    });

    console.log('Sending product:', newProduct);
  }
}
