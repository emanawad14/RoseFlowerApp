import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AddressState } from '../types/selectedAddressState.interface';
import { ViewDialogState } from '../types/viewDialogType.enum';

export const selectSelectedAddress =
  createFeatureSelector<AddressState>('selectedAddress');

export const SelectedAddress = createSelector(
  selectSelectedAddress,
  (state) => state.selectedAddress
);
//////////////////view Dialog Address Component Get Addresses || add address////////////////////////////////////////////
export const selectCurrentDialogView =
  createFeatureSelector<ViewDialogState>('viewDialog');

export const selectCurrentView = createSelector(
  selectCurrentDialogView,
  (state) => state.currentView
);
