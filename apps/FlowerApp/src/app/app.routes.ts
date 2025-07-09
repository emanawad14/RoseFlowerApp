import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'product-list',
    loadComponent: () =>
      import('./features/pages/product-list/productList.component').then(
        (c) => c.ProductListComponent
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
];
