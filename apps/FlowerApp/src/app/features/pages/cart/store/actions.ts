import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddToCartResponseDTO } from '../interfaces/addToCartResponse.interface';

export const cartActions = createActionGroup({
  source: 'cart',
  events: {
    'Get Logged-User-Cart': emptyProps(),
    'Get products-in-cart-success ': props<AddToCartResponseDTO>(),
    'Get products-in-cart-failure ': emptyProps(),
  },
});
