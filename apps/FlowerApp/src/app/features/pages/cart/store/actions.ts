import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddToCartResponseDTO } from '../interfaces/addToCartResponse.interface';
import { AddToCartRequestInterface } from '../interfaces/addToCarRequest.interface';
import {
  deleteCartResponseDTO,
  UpdateQuantityRequest,
} from '../interfaces/updateProductQuantity.interface';

export const cartActions = createActionGroup({
  source: 'cart',
  events: {
    //Get
    'Get Logged User Cart': emptyProps(),
    'Get products in cart success': props<AddToCartResponseDTO>(),
    'Get products in cart failure': emptyProps(),
    //add
    AddProductToCard: props<AddToCartRequestInterface>(),
    'Add products in cart success': props<AddToCartResponseDTO>(),
    'Add products in cart failure': emptyProps(),
    //Delete specific product

    deleteProductFromCard: props<{ product: string }>(),
    ' delete Product From Card success ': props<AddToCartResponseDTO>(),
    ' delete Product From Card failure ': emptyProps(),

    //Delete cart
    deleteCart: emptyProps(),
    'delete Cart success ': props<deleteCartResponseDTO>(),
    'delete Cart failure ': emptyProps(),

    //update quantity specific product
    updateProductQuantityFromCard: props<UpdateQuantityRequest>(),
    'update Product Quantity success ': props<AddToCartResponseDTO>(),
    'update Product Quantity failure ': emptyProps(),
  },
});
