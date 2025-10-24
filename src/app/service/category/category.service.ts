import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiServerUrl = 'https://webshop-backend-v4jm3.ondigitalocean.app';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/categorie`);
  }

}
