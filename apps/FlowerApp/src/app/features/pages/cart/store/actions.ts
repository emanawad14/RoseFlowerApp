import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AddToCartResponseDTO } from '../interfaces/addToCartResponse.interface';
import { AddToCartRequestInterface } from '../interfaces/addToCarRequest.interface';
import {
  deleteCartResponseDTO,
  UpdateQuantityRequest,
} from '../interfaces/updateProductQuantity.interface';
import { ErrorResponseInterface } from 'apps/FlowerApp/src/app/shared/interfaces/errorResponce.interface';

export const cartActions = createActionGroup({
  source: 'cart',
  events: {
    //Get
    'Get Logged User Cart': emptyProps(),
    'Get products in cart success': props<AddToCartResponseDTO>(),
    'Get products in cart failure':  props<{error:ErrorResponseInterface}>(),
    //add
    AddProductToCart: props<AddToCartRequestInterface>(),
    'Add products in cart success': props<AddToCartResponseDTO>(),
    'Add products in cart failure': props<{error:ErrorResponseInterface}>(),
    //Delete specific product

    deleteProductFromCart: props<{ product: string }>(),
    ' delete Product From Cart success ': props<AddToCartResponseDTO>(),
    ' delete Product From Cart failure ': props<{error:ErrorResponseInterface}>(),

    //Delete cart
    deleteCart: emptyProps(),
    'delete Cart success ': props<deleteCartResponseDTO>(),
    'delete Cart failure ':  props<{error:ErrorResponseInterface}>(),
    //update quantity specific product
    updateProductQuantityFromCart: props<UpdateQuantityRequest>(),
    'update Product Quantity success ': props<AddToCartResponseDTO>(),
    'update Product Quantity failure ': props<{error:ErrorResponseInterface}>(),
  },
});
