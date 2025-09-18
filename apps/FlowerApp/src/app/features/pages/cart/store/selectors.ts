import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ViewCartState, ViewCartStateEnum } from '../interfaces/view.enum';

export const selectViewState = createFeatureSelector<ViewCartState>('viewCart');
////current cart view Address OR Cart ///////////
export const selectCurrentView = createSelector(
  selectViewState,
  (state: ViewCartState): ViewCartStateEnum => state.currentView
);
