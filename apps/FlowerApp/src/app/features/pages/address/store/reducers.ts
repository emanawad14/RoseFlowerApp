import { createFeature, createReducer, on } from '@ngrx/store';
import { AddressStateInterface } from '../types/addressState.interface';
import { addressActions } from './actions';

const initialState: AddressStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

export const addressFeature = createFeature({
  name: 'address',
  reducer: createReducer(
    initialState,
    ///Get address
    on(addressActions.getLoggedUserAddress, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(addressActions.getAddressSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      data: action.addresses,
    })),
    on(addressActions.getAddressFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    })),
    //delete
    on(addressActions.deleteAddress, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(addressActions.deleteAddressSuccess, (state, action, ) => ({
      ...state,
      isLoading: false,
      data: action.address,
    })),
    on(addressActions.deleteAddressFailure, (state, action) => ({
      ...state,
      isLoading: false,
      error: action.error,
    }))
  ),
});
export const {
  name: addressFeatureKey, // feature name
  reducer: addressReducer, // feature reducer
  selectIsLoading, //  selector for `loading` property
  selectError, // selector for `error` property
  selectData: selectAddressesData, // feature selector
} = addressFeature;
