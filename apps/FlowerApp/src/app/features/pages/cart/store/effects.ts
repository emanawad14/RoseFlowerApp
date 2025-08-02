import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../services/cart.service';
import { cartActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { AddToCartResponseDTO } from '../interfaces/addToCartResponse.interface';

export const getLoggedUserCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions['getLogged-User-Cart']),
      switchMap(() => {
        return cartService.getLoggedUserCart().pipe(
          map((loggedUserREsponse: AddToCartResponseDTO) => {
            return cartActions['getProducts-in-cart-success'](
              loggedUserREsponse
            );
          }),
          catchError(() => {
            return of(cartActions['getProducts-in-cart-failure']());
          })
        );
      })
    );
  },
  { functional: true }
);
