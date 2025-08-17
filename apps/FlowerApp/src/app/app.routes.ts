import { Route } from '@angular/router';
import { MainLayoutComponent } from './shared/components/ui/main-layout.component';
import { loginBlockGuard } from './core/guards/login-block.guard';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/ui/main-layout.component').then(
        (c) => c.MainLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // default route
      {
        path: 'product-details/:id',
        loadComponent: () =>
          import(
            './features/pages/product-details/productDetail.component'
          ).then((c) => c.ProductDetailComponent),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./features/pages/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./features/pages/profile/components/profile.component').then(
            (c) => c.ProfileComponent
          ),
        canActivate: [authGuard],
      },
      {
        path: 'product-list',
        loadComponent: () =>
          import('./features/pages/product-list/productList.component').then(
            (c) => c.ProductListComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/pages/cart/layouts/cartLayout.component').then(
            (c) => c.CartLayoutComponent
          ),
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./features/pages/cart/components/cart.component').then(
                (c) => c.CartComponent
              ),
            canActivate: [authGuard],
          }, // default route
        ],
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./shared/components/ui/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/pages/login/login.component').then(
            (e) => e.LoginComponent
          ),
        canActivate: [loginBlockGuard],
      },
      // },
      // {
      //   path: 'register',
      //   loadComponent: () =>
      //     import('./core/pages/register/register.component').then(
      //       (e) => e.RegisterComponent
      //     ),
      // },
      {
        path: 'forget-password',
        loadComponent: () =>
          import(
            './features/pages/forget-password/forget-password.component'
          ).then((e) => e.ForgetPasswordComponent),
      },
    ],
  },
];
