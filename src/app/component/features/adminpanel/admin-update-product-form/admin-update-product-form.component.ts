import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, of } from 'rxjs';
import { ProductService } from '../../../../service/product/product.service';
import { CategoryService } from '../../../../service/category/category.service';
import { Product } from '../../../../model/product';
import { Category } from '../../../../model/category';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-admin-update-product-form',
  templateUrl: './admin-update-product-form.component.html',
  imports: [
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./admin-update-product-form.component.scss']
})
export class AdminUpdateProductFormComponent implements OnInit {
  profileForm!: FormGroup;
  productId!: number;
  categories$!: Observable<Category[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("this is product id" + this.productId)

    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, Validators.required],
      stock: [0, Validators.required],
      category: [null, Validators.required]
    });

    const product$ = this.productService.getProductById(this.productId);
    const categories$ = this.categoryService.getCategories();

    combineLatest([product$, categories$]).subscribe(([product, categories]) => {
      this.categories$ = of(categories);

      this.profileForm.patchValue({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.categorie.categorie_id
      });
    });
  }

  // onSubmit() {
  // console.log(this.profileForm.value);
  // this.productService.updateProduct(this.profileForm.value).subscribe((res:any) =>{
  //   console.log("GELUKT!");
  // })
  // }

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedProduct = {
        product_id: this.productId,
        name: this.profileForm.value.name,
        description: this.profileForm.value.description,
        price: this.profileForm.value.price,
        stock: this.profileForm.value.stock,
        categorie_id: this.profileForm.value.category
      };


      console.log('Updating product:', updatedProduct);

      this.productService.updateProduct(updatedProduct).subscribe({
        next: (res) => {
          console.log('GELUKT!', res);
        },
        error: (err) => {
          console.error('Update mislukt:', err);
        }
      });
    }
  }

}
