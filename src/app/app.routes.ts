import { Routes } from '@angular/router';

import { RegisterPage } from './pages/register-page/register-page';
import { ProductsPage } from './pages/products-page/products-page';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: RegisterPage },
  { path: 'products', component: ProductsPage },
  { path: '**', redirectTo: 'register' }
];
