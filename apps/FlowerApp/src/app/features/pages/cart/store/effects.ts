import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../services/cart.service';
import { cartActions } from './actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AddToCartResponseDTO } from '../interfaces/addToCartResponse.interface';
import { deleteCartResponseDTO } from '../interfaces/updateProductQuantity.interface';
import { ToastService } from 'apps/FlowerApp/src/app/shared/services/toast.service';

export const getLoggedUserCartEffect = createEffect(
  (actions$ = inject(Actions), cartService = inject(CartService)) => {
    return actions$.pipe(
      ofType(cartActions['getLoggedUserCart']),
      switchMap(() => {
        return cartService.getLoggedUserCart().pipe(
          map((loggedUserREsponse: AddToCartResponseDTO) => {
            return cartActions['getProductsInCartSuccess'](loggedUserREsponse);
          }),
          catchError(({ error }) => {
            return of(cartActions['getProductsInCartFailure']({ error }));
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
      ofType(cartActions['addProductToCart']),
      switchMap(({ product, quantity }) => {
        return cartService.addProductToCart({ product, quantity }).pipe(
          map((addProductResponse: AddToCartResponseDTO) => {
            return cartActions['addProductsInCartSuccess'](addProductResponse);
          }),
          catchError(({ error }) => {
            return of(
              cartActions['addProductsInCartFailure']({ error: error })
            );
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
      ofType(cartActions.deleteProductFromCart),
      switchMap(({ product }) => {
        return cartService.deleteSpecificProduct(product).pipe(
          map((deleteProductResponse: AddToCartResponseDTO) => {
            return cartActions['deleteProductFromCartSuccess'](
              deleteProductResponse
            );
          }),
          catchError(({ error }) => {
            return of(cartActions['deleteProductFromCartFailure']({ error }));
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
          catchError(({ error }) => {
            return of(cartActions['deleteCartFailure']({ error }));
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
      ofType(cartActions.updateProductQuantityFromCart),
      switchMap(({ product, quantity }) => {
        return cartService
          .updateSpecificCartQuantity({ product, quantity })
          .pipe(
            map((updateQuantityResponse: AddToCartResponseDTO) => {
              return cartActions['updateProductQuantitySuccess'](
                updateQuantityResponse
              );
            }),
            catchError(({ error }) => {
              return of(cartActions['updateProductQuantityFailure']({ error }));
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
export const addProductToCartFailureDisplayMsg = createEffect(
  (actions$ = inject(Actions), toastService = inject(ToastService)) =>
    actions$.pipe(
      ofType(
        cartActions.addProductsInCartFailure,
        cartActions.deleteCartFailure,
        cartActions.deleteProductFromCartFailure,
        cartActions.getProductsInCartFailure,
        cartActions.updateProductQuantityFailure
      ),
      tap(({ error }) => {
        // console.log(error);

        toastService.showError(error.error);
      })
    ),
  { functional: true, dispatch: false }
);
