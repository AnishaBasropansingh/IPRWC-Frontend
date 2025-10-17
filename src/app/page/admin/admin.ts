import { Component } from '@angular/core';
import {
  AdminCrudProductComponent
} from '../../component/features/adminpanel/admin-crud-product/admin-crud-product.component';
import {
  AdminCrudCategorieComponent
} from '../../component/features/adminpanel/admin-crud-categorie/admin-crud-categorie.component';

@Component({
  selector: 'app-admin',
  imports: [
    AdminCrudProductComponent,
    AdminCrudCategorieComponent
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {

}
