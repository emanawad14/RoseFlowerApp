import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./core/layouts/userBoard/userBoard.component').then(
        (c) => c.UserBoardComponent
      ),
  },
];
