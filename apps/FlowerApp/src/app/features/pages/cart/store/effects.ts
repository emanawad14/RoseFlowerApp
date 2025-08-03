import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../services/cart.service';
import { cartActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { AddToCartResponseDTO } from '../interfaces/addToCartResponse.interface';
import { AddToCartRequestInterface } from '../interfaces/addToCarRequest.interface';
import { deleteCartResponseDTO } from '../interfaces/updateProductQuantity.interface';

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

export const addProductToCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions['addProductToCard']),
      switchMap(({ product, quantity }) => {
        return cartService.addProductToCart({ product, quantity }).pipe(
          map((addProductResponse: AddToCartResponseDTO) => {
            return cartActions['addProducts-in-cart-success'](
              addProductResponse
            );
          }),
          catchError(() => {
            return of(cartActions['addProducts-in-cart-failure']());
          })
        );
      })
    );
  },
  { functional: true }
);
export const deleteProductFromCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.deleteProductFromCard),
      switchMap(({ product }) => {
        return cartService.deleteSpecificProduct(product).pipe(
          map((deleteProductResponse: AddToCartResponseDTO) => {
            return cartActions['deleteProductFromCard-success'](
              deleteProductResponse
            );
          }),
          catchError(() => {
            return of(cartActions['deleteProductFromCard-failure']());
          })
        );
      })
    );
  },
  { functional: true }
);
export const deleteCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.deleteCart),
      switchMap(() => {
        return cartService.deleteCart().pipe(
          map((deleteCartResponse: deleteCartResponseDTO) => {
            return cartActions['deleteCart-success'](deleteCartResponse);
          }),
          catchError(() => {
            return of(cartActions['deleteCart-failure']());
          })
        );
      })
    );
  },
  { functional: true }
);
export const updateProductQuantityEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions.updateProductQuantityFromCard),
      switchMap(({ product, quantity }) => {
        return cartService
          .updateSpecificCartQuantity({ product, quantity })
          .pipe(
            map((updateQuantityResponse: AddToCartResponseDTO) => {
              return cartActions['updateProductQuantity-success'](
                updateQuantityResponse
              );
            }),
            catchError(() => {
              return of(cartActions['updateProductQuantity-failure']());
            })
          );
      })
    );
  },
  { functional: true }
);
