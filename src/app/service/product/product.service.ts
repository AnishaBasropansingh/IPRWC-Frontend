import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Product} from '../../model/product';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/product`);
  }

  public addProduct(product : Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiServerUrl}/product/admin`, product );
  }

  public updateProduct(product: {
    product_id: number;
    name: string;
    description: any;
    price: any;
    stock: any;
    categorie_id: any
  }): Observable<Product> {
    const token = this.authService.getToken();
    if (!token) {
      console.error('Geen token gevonden!');
      return throwError(() => new Error('Geen token gevonden'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    console.log('KLOPT DE URL???', `${this.apiServerUrl}/product/admin/${product.product_id}`);
    console.log('UPDated product:', product);
    console.log('Token:', token);

    return this.http.put<Product>(
      `${this.apiServerUrl}/product/admin/${product.product_id}`,
      product,
      { headers }
    );
  }


  public deleteProduct(product_id: number): Observable<void> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<void>(`${this.apiServerUrl}/product/admin/${product_id}`, { headers });
  }

  public getProductById(product_id : number): Observable<Product>{
    return this.http.get<Product>(`${this.apiServerUrl}/product/${product_id}`);
  }
}

