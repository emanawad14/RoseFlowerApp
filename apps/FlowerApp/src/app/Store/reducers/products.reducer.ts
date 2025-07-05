import { createReducer, on } from '@ngrx/store';
import { ProductsAdapter, initialState } from '../state/products.state';
import { loadProducts, loadProductsFail, loadProductsSuccess } from '../actions/products.action';

export const ProductsReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({
    ...state,
    errorMsg: '',
  })),
  on(loadProductsSuccess, (state, action) => {
    return ProductsAdapter.setAll(action.list.products, {
      ...state,
      errorMsg: ''
    })
  }),
  on(loadProductsFail, (state, action) => ({
    ...state,
    errorMsg: action.errorMsg,
  })),

  // add Products
  // on(addProducts, (state) => ({
  //   ...state,
  //   errorMsg: '',
  // })),
  // on(addProductsSuccess, (state, { inputData }) =>
  //   ProductsAdapter.addOne(inputData, { ...state, errorMsg: '' })
  // ),
  // on(addProductsFail, (state, { errorMsg }) => ({
  //   ...state,
  //   errorMsg: errorMsg,
  // })),

  // edit Products
  // on(editProducts, (state) => ({
  //   ...state,
  //   errorMsg: '',
  // })),
  // // })),
  // on(editProductsSuccess, (state, { inputData, id }) =>
  //   ProductsAdapter.updateOne(
  //     { id, changes: inputData },
  //     { ...state, errorMsg: '' }
  //   )
  // ),
  // on(editProductsFail, (state, { errorMsg }) => ({
  //   ...state,
  //   errorMsg: errorMsg,
  // })),

  // // delete Products
  // on(deleteProducts, (state) => ({
  //   ...state,
  //   errorMsg: '',
  // })),
  // on(deleteProductsSuccess, (state, { id }) =>
  //   ProductsAdapter.removeOne(id, { ...state, errorMsg: '' })
  // ),
  // on(deleteProductsFail, (state, { errorMsg }) => ({
  //   ...state,
  //   errorMsg: errorMsg,
  // }))

);
