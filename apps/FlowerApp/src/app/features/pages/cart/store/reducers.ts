import { createFeature, createReducer, on } from '@ngrx/store';
import { cartStateInterface } from '../interfaces/getProductsCartState.interface';
import { cartActions } from './actions';

const initialState: cartStateInterface = {
  isLoading: false,
  error: null,
  numberOfCartItems: 0,
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
      numberOfCartItems: action.numOfCartItems,
      data: action,
    })),
    on(cartActions['getProducts-in-cart-failure'], (state) => ({
      ...state,
      isLoading: false,
    })),

    //add to cart
    on(cartActions.addProductToCard, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(cartActions['addProducts-in-cart-success'], (state, action) => ({
      ...state,
      isLoading: false,
      numberOfCartItems: action.numOfCartItems,
      data: action,
    })),
    on(cartActions['addProducts-in-cart-failure'], (state) => ({
      ...state,
      isLoading: false,
    })),

    //delete product
    on(cartActions.deleteProductFromCard, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(cartActions['deleteProductFromCard-success'], (state, action) => ({
      ...state,
      isLoading: false,
      numberOfCartItems: action.numOfCartItems,
      data: action,
    })),
    on(cartActions['deleteProductFromCard-failure'], (state) => ({
      ...state,
      isLoading: false,
    })),
    //delete cart
    on(cartActions.deleteCart, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(cartActions['deleteCart-success'], (state, action) => ({
      ...state,
      isLoading: false,
      numberOfCartItems: 0,
      data:null
    
    })),
    on(cartActions['deleteCart-failure'], (state) => ({
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
} = cartFeature;
