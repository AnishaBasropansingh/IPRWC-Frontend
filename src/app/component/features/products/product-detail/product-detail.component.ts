import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map, catchError } from 'rxjs/operators';
import { Product } from '../../../../model/product';
import { ProductService } from '../../../../service/product/product.service';
import {AuthService} from '../../../../service/auth/auth.service';
import {CartService} from '../../../../service/cart/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  public product$!: Observable<Product>;
  private _destroy$ = new Subject<void>();
  successMessage = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    protected authService: AuthService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.product$ = this.productService.getProductById(id).pipe(
      takeUntil(this._destroy$),
      map((res: Product) => {
        return { ...res, price: res.price };
      }),
      catchError(err => {
        throw err;
      })
    );
  }

  addToCart(product: Product) {
    if (!this.authService.isLoggedIn()) {
      alert('Je moet eerst inloggen om dit product te bestellen.');
      return;
    }

    if (product.stock === 0) {
      alert('Dit product is momenteel uitverkocht.');
      return;
    }

    this.cartService.addProduct(product);
    this.router.navigate(['/cart']);
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
