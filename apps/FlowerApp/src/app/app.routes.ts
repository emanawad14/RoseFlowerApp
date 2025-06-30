import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'product-list', pathMatch: 'full' },
   {
    path: 'product-list',
    loadComponent: () =>
      import('./features/pages/productList.component').then(
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
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
];
