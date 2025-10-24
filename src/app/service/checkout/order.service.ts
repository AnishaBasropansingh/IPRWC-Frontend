import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Order} from '../../model/order';
import {Product} from '../../model/product';
import {CreateProduct} from '../../model/createProduct';
import {OrderDTO} from '../../model/OrderDTO';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) {}

  public getOrders(): Observable<Order[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Order[]>(`${this.apiServerUrl}/order`, {headers});
  }

  public getOrderById(order_id : number): Observable<Order> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.get<Order>(`${this.apiServerUrl}/order/${order_id}`, {headers});
  }

  public createOrder(orderDTO: OrderDTO): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      });
    return this.http.post(`${this.apiServerUrl}/order`, orderDTO, { headers });
  }

}
