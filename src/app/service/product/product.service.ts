import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiServerUrl}/product`);
  }

  public addProduct(product : Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiServerUrl}/product/admin`, product );
  }

  public updateProduct(product : Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiServerUrl}/product/admin/`, product );
  }

  public deleteProduct(product_id : number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/product/admin/${product_id}` );
  }

  public getProductById(product_id : number): Observable<Product>{
  return this.http.get<Product>(`${this.apiServerUrl}/product/${product_id}`);
  }
}

