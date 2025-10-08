import {RouterModule, Routes} from '@angular/router';
import {Home} from './page/home/home';
import {Product} from './page/product/product';
import {About} from './page/about/about';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'product', component: Product},
  { path: 'about', component: About },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
