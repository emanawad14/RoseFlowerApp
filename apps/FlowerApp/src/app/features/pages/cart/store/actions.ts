import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddToCartResponseDTO } from '../interfaces/addToCartResponse.interface';
import { AddToCartRequestInterface } from '../interfaces/addToCarRequest.interface';
import { deleteCartResponseDTO } from '../interfaces/updateProductQuantity.interface';

export const cartActions = createActionGroup({
  source: 'cart',
  events: {
    //Get
    'Get Logged-User-Cart': emptyProps(),
    'Get products-in-cart-success ': props<AddToCartResponseDTO>(),
    'Get products-in-cart-failure ': emptyProps(),
    //add
    AddProductToCard: props<AddToCartRequestInterface>(),
    'Add products-in-cart-success ': props<AddToCartResponseDTO>(),
    'Add products-in-cart-failure ': emptyProps(),
    //Delete specific product

    deleteProductFromCard: props<{ product: string }>(),
    ' deleteProductFromCard-success ': props<AddToCartResponseDTO>(),
    ' deleteProductFromCard-failure ': emptyProps(),

    //Delete cart
    deleteCart: emptyProps(),
    'deleteCart-success ': props<deleteCartResponseDTO>(),
    'deleteCart-failure ': emptyProps(),
  },
});
