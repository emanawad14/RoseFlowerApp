import { Route } from '@angular/router';
import { MainLayoutComponent } from './shared/components/ui/main-layout.component';

export const appRoutes: Route[] = [
  {
    path: '',
    // component: MainLayoutComponent, // has <app-nav-bar> and <app-footer>
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
      // {
      //   path: 'verify-code',
      //   loadComponent: () =>
      //     import('./core/pages/verify-code/verify-code.component').then(
      //       (e) => e.VerifyCodeComponent
      //     ),
      // },
      // {
      //   path: 'reset-password',
      //   loadComponent: () =>
      //     import('./core/pages/reset-password/reset-password.component').then(
      //       (e) => e.ResetPasswordComponent
      //     ),
      // },
    ],
  },
];
