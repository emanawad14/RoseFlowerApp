import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../services/cart.service';
import { cartActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AddToCartResponseDTO } from '../interfaces/addToCartResponse.interface';
import { deleteCartResponseDTO } from '../interfaces/updateProductQuantity.interface';
import { ToastService } from 'apps/FlowerApp/src/app/shared/services/toast.service';
import { MessageService } from 'primeng/api';

export const getLoggedUserCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions['getLoggedUserCart']),
      switchMap(() => {
        return cartService.getLoggedUserCart().pipe(
          map((loggedUserREsponse: AddToCartResponseDTO) => {
            return cartActions['getProductsInCartSuccess'](loggedUserREsponse);
          }),
          catchError(() => {
            return of(cartActions['getProductsInCartFailure']());
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
            return cartActions['addProductsInCartSuccess'](addProductResponse);
          }),
          catchError(() => {
            return of(cartActions['addProductsInCartFailure']());
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
            return cartActions['deleteProductFromCardSuccess'](
              deleteProductResponse
            );
          }),
          catchError(() => {
            return of(cartActions['deleteProductFromCardFailure']());
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
            return cartActions['deleteCartSuccess'](deleteCartResponse);
          }),
          catchError(() => {
            return of(cartActions['deleteCartFailure']());
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
              return cartActions['updateProductQuantitySuccess'](
                updateQuantityResponse
              );
            }),
            catchError(() => {
              return of(cartActions['updateProductQuantityFailure']());
            })
          );
      })
    );
  },
  { functional: true }
);
export const addProductToCartSuccessDisplayMsg = createEffect(
  (actions$ = inject(Actions), toastService = inject(ToastService)) =>
    actions$.pipe(
      ofType(cartActions['addProductsInCartSuccess']),
      tap(() => {
        toastService.showSuccess('Product added to cart');
      })
    ),
  { functional: true, dispatch: false }
);
