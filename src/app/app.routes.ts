import {RouterModule, Routes} from '@angular/router';
import {Home} from './page/home/home';
import {ProductComponent} from './page/product/product.component';
import {About} from './page/about/about';
import {NgModule, Renderer2} from '@angular/core';
import {ProductDetailComponent} from './component/features/products/product-detail/product-detail.component';
import {LoginFormComponent} from './component/features/login/login-form/login-form.component';
import {RegisterFormComponent} from './component/features/register/register-form/register-form.component';
import {Admin} from './page/admin/admin';
import {RoleGuard} from './guard/RoleGuard';
import {UnauthorizedComponent} from './component/features/adminpanel/unauthorized/unauthorized.component';
import {
  AdminUpdateProductFormComponent
} from './component/features/adminpanel/update-product/admin-update-product-form.component';
import {
  AdminCreateProductFormComponent
} from './component/features/adminpanel/create-product/admin-create-product-form.component';
import {CartComponent} from './component/features/cart/cart-details/cart.component';
import {OrderDetailsComponent} from './component/features/checkout/order-details/order-details.component';
import {OrderComponent} from './page/order/order.component';
import {UserGuard} from './guard/UserGuard';
import {RenderMode} from '@angular/ssr'

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'product', component: ProductComponent},
  { path: 'product/:id', component: ProductDetailComponent},
  { path: 'about', component: About },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'admin', component: Admin, canActivate: [RoleGuard] },
  { path: 'admin-update-product/:id', component: AdminUpdateProductFormComponent, canActivate: [RoleGuard] },
  { path: 'admin-create-product', component: AdminCreateProductFormComponent, canActivate: [RoleGuard] },
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: 'cart', component: CartComponent, canActivate: [UserGuard] },
  { path: 'order', component: OrderComponent, canActivate: [UserGuard] },
  { path: 'order-detail', component: OrderDetailsComponent, canActivate: [UserGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
