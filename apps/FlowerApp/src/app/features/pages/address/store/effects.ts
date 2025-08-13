import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AddressService } from '../services/address.service';
import { addressActions } from './actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { AddressResponceInterface } from 'apps/FlowerApp/src/app/shared/interfaces/addressResponse.interface';

export const getAllAddresses = createEffect(
  (actions$ = inject(Actions), addressService = inject(AddressService)) => {
    return actions$.pipe(
      ofType(addressActions.getLoggedUserAddress),
      switchMap(() => {
        return addressService.getUserAddresses().pipe(
          map((response: AddressResponceInterface) => {
            return addressActions.getAddressSuccess(response);
          }),
          catchError(({ error }) => {
            return of(addressActions.getAddressFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteAddress = createEffect(
  (actions$ = inject(Actions), addressService = inject(AddressService)) => {
    return actions$.pipe(
      ofType(addressActions.deleteAddress),
      switchMap(({ addressId }) => {
        return addressService.removeAddress(addressId).pipe(
          map((deleteAddressResponse: AddressResponceInterface) => {
            return addressActions.deleteAddressSuccess(deleteAddressResponse);
          }),
          catchError(({ error }) => {
            return of(addressActions.deleteAddressFailure({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);
