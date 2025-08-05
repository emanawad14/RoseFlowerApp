import { createFeature, createReducer, on } from '@ngrx/store';
import { cartStateInterface } from '../interfaces/getProductsCartState.interface';
import { cartActions } from './actions';

const initialState: cartStateInterface = {
  isLoading: false,
  error: null,
  numberOfCartItems: 0,
  data: null,
  addToCartLoading: false,
  addToCartProductId: null,
};
export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(cartActions['getLoggedUserCart'], (state) => ({
      ...state,
      isLoading: true,
    })),
    on(cartActions['getProductsInCartSuccess'], (state, action) => ({
      ...state,
      isLoading: false,
      numberOfCartItems: action.numOfCartItems,
      data: action,
    })),
    on(cartActions['getProductsInCartFailure'], (state) => ({
      ...state,
      isLoading: false,
    })),

    //add to cart
    on(cartActions.addProductToCard, (state, { product }) => ({
      ...state,
      addToCartLoading: true,
      addToCartProductId: product,
    })),
    on(cartActions['addProductsInCartSuccess'], (state, action) => ({
      ...state,
      addToCartLoading: false,
      addToCartProductId: null,
      numberOfCartItems: action.numOfCartItems,
      data: action,
    })),
    on(cartActions['addProductsInCartFailure'], (state) => ({
      ...state,
      addToCartLoading: false,
      addToCartProductId: null,
    })),

    //delete product
    on(cartActions.deleteProductFromCard, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(cartActions['deleteProductFromCardSuccess'], (state, action) => ({
      ...state,
      isLoading: false,
      numberOfCartItems: action.numOfCartItems,
      data: action,
    })),
    on(cartActions['deleteProductFromCardFailure'], (state) => ({
      ...state,
      isLoading: false,
    })),
    //delete cart
    on(cartActions.deleteCart, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(cartActions['deleteCartSuccess'], (state, action) => ({
      ...state,
      isLoading: false,
      numberOfCartItems: 0,
      data: null,
    })),
    on(cartActions['deleteCartFailure'], (state) => ({
      ...state,
      isLoading: false,
    })),
    //update specific product quantity in cart
    on(cartActions.updateProductQuantityFromCard, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(cartActions['updateProductQuantitySuccess'], (state, action) => ({
      ...state,
      isLoading: false,
      numberOfCartItems: action.numOfCartItems,
      data: action,
    })),
    on(cartActions['updateProductQuantityFailure'], (state) => ({
      ...state,
      isLoading: false,
    }))
  ),
});
export const {
  name: cartFeatureKey, // feature name
  reducer: cartReducer, // feature reducer
  selectIsLoading, //  selector for `loading` property
  selectError, // selector for `error` property
  selectData: selectCartProductData, // feature selector
  selectNumberOfCartItems,
  selectAddToCartLoading,
  selectAddToCartProductId,
} = cartFeature;
