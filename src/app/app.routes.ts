import {RouterModule, Routes} from '@angular/router';
import {Home} from './page/home/home';
import {ProductComponent} from './page/product/product.component';
import {About} from './page/about/about';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'product', component: ProductComponent},
  { path: 'about', component: About },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
