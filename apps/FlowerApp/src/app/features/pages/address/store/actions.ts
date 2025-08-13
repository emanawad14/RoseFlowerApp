import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  Address,
  AddressResponceInterface,
} from 'apps/FlowerApp/src/app/shared/interfaces/addressResponse.interface';
import { ErrorResponseInterface } from 'apps/FlowerApp/src/app/shared/interfaces/errorResponce.interface';

export const addressActions = createActionGroup({
  source: 'address',
  events: {
    //Get
    'Get Logged User Address': emptyProps(),
    'Get Address success': props<AddressResponceInterface>(),
    'Get Address failure': props<{ error: ErrorResponseInterface }>(),
    //add
    addAddress: props<Address>(),
    'Add Address success': props<AddressResponceInterface>(),
    'Add Address failure': props<{ error: ErrorResponseInterface }>(),
    //Delete specific product

    deleteAddress: props<{ addressId: string }>(),
    'delete Address success ': props<AddressResponceInterface>(),
    'delete Address failure ': props<{ error: ErrorResponseInterface }>(),

    //update quantity specific product
    updateAddress: props<Address>(),
    'update Address success ': props<AddressResponceInterface>(),
    'update Address failure ': props<{
      error: ErrorResponseInterface;
    }>(),
  },
});
