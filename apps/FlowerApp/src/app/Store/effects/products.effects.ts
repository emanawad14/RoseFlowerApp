import { Injectable, inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ProductService } from '../../shared/services/product.service';
import { loadProducts, loadProductsFail, loadProductsSuccess } from '../actions/products.action';


@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private _productService = inject(ProductService);

  loadProducts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadProducts),
        exhaustMap(() =>
          this._productService.getAllProducts().pipe(
            map((data) => loadProductsSuccess({ list: data })),
            catchError((error) =>
              of(loadProductsFail({ errorMsg: error.message }))
            )
          )
        )
      );
    },
    { useEffectsErrorHandler: false }
  );

  // addProducts$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(addProducts),
  //       exhaustMap((action) => {
  //         return this._productService.addProducts(action.inputData).pipe(
  //           map((data) => {
  //             return addProductsSuccess({ inputData: data });
  //           }),
  //           catchError((error) => {
  //             return of(addProductsFail({ errorMsg: error.message }));
  //           })
  //         );
  //       })
  //     );
  //   },
  //   { useEffectsErrorHandler: false }
  // );

  // editProducts$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(editProducts),
  //       exhaustMap((action) => {
  //         return this._productService
  //           .editProducts(action.inputData, action.id)
  //           .pipe(
  //             map((data) => {
  //               return editProductsSuccess({ inputData: data, id: data.id });
  //             }),
  //             catchError((error) => {
  //               return of(editProductsFail({ errorMsg: error.message }));
  //             })
  //           );
  //       })
  //     );
  //   },
  //   { useEffectsErrorHandler: false }
  // );

  // deleteProducts$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(deleteProducts),
  //       exhaustMap((action) => {
  //         return this._productService.deleteProducts(action.id).pipe(
  //           map(() => {
  //             return deleteProductsSuccess({
  //               inputData: {} as IProducts,
  //               id: action.id,
  //             });
  //           }),
  //           catchError((error) => {
  //             return of(deleteProductsFail({ errorMsg: error.message }));
  //           })
  //         );
  //       })
  //     );
  //   },
  //   { useEffectsErrorHandler: false }
  // );
}
