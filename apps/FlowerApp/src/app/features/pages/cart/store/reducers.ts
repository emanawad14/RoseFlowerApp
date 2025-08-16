import { ViewCartState } from './../interfaces/view.enum';
import {
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { cartStateInterface } from '../interfaces/getProductsCartState.interface';
import { cartActions, switchView } from './actions';
import { ViewCartStateEnum } from '../interfaces/view.enum';

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
    on(cartActions['getProductsInCartFailure'], (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })),

    //add to cart
    on(cartActions.addProductToCart, (state, { product }) => ({
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
    on(cartActions['addProductsInCartFailure'], (state, action) => ({
      ...state,
      addToCartLoading: false,
      addToCartProductId: null,
      error: action.error,
    })),

    //delete product
    on(cartActions.deleteProductFromCart, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(cartActions['deleteProductFromCartSuccess'], (state, action) => ({
      ...state,
      isLoading: false,
      numberOfCartItems: action.numOfCartItems,
      data: action,
    })),
    on(cartActions['deleteProductFromCartFailure'], (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
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
    on(cartActions['deleteCartFailure'], (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })),
    //update specific product quantity in cart
    on(cartActions.updateProductQuantityFromCart, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(cartActions['updateProductQuantitySuccess'], (state, action) => ({
      ...state,
      isLoading: false,
      numberOfCartItems: action.numOfCartItems,
      data: action,
    })),
    on(cartActions['updateProductQuantityFailure'], (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
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

export const initialViewState: ViewCartState = {
  currentView: ViewCartStateEnum.Cart,
};

export const selectViewState = createFeatureSelector<ViewCartState>('viewCart');

export const selectCurrentView = createSelector(
  selectViewState,
  (state: ViewCartState): ViewCartStateEnum => state.currentView
);

export const viewCartReducer = createReducer(
  initialViewState,
  on(switchView, (state, { view }) => ({ ...state, currentView: view }))
);
