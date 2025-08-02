import { createFeature, createReducer, on } from '@ngrx/store';
import { cartStateInterface } from '../interfaces/getProductsCartState.interface';
import { cartActions } from './actions';

const initialState: cartStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};
export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(cartActions['getLogged-User-Cart'], (state) => ({
      ...state,
      isLoading: true,
    })),
    on(cartActions['getProducts-in-cart-success'], (state, action) => ({
      ...state,
      isLoading: false,
      data: action,
    })),
    on(cartActions['getProducts-in-cart-failure'], (state) => ({
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
} = cartFeature;
