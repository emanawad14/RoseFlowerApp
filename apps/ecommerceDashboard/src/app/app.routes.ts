import { Route } from '@angular/router';
export const appRoutes: Route[] = [


    
    { path: '', redirectTo: 'category', pathMatch: 'full' },
   
    
  {
    path: 'category',
    loadComponent: () =>
      import('./pages/Category/Category.component').then(
        (m) => m.CategoryComponent,
      ),
  },
  {
    path: 'add-category',
    loadComponent: () =>
      import('./pages/AddCategory/AddCategory.component').then(
        (m) => m.AddCategoryComponent,
      ),
  },
  
  {
    path: 'edit-category',
    loadComponent: () =>
      import('./pages/UpdateCate/UpdateCate.component').then(
        (m) => m.UpdateCateComponent,
      ),
  },
  {
    path: 'occasions',
    loadComponent: () =>
      import('./pages/Occasions/Occasions.component').then(
        (m) => m.OccasionsComponent,
      ),
  },
  {
    path: 'edit-occasion',
    loadComponent: () =>
      import('./pages/UpdateOccassion/UpdateOccassion.component').then(
        (m) => m.UpdateOccassionComponent,
      ),
  },
   {
    path: 'add-occasion',
    loadComponent: () =>
      import('./pages/AddOccasion/AddOccasion.component').then(
        (m) => m.AddOccasionComponent,
      ),
  },
  
  
  //   {
  //   path: '**',
  //   component: NotFoundComponent,
  // },
];
