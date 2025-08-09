import { ErrorResponseInterface } from './../../../../shared/interfaces/errorResponce.interface';
import { AddToCartResponseDTO } from './addToCartResponse.interface';

export interface cartStateInterface {
  isLoading: boolean;
  error: ErrorResponseInterface|null;
  numberOfCartItems: number;
  data: AddToCartResponseDTO | null;
  addToCartLoading: boolean;
  addToCartProductId: string | null;
}

export interface CartStates {
  getProductsCartResponse?: AddToCartResponseDTO | null;
  isLoading?: boolean;
  error?: ErrorResponseInterface|null;
  numberOfItemsInCart: number;
  addToCartLoading?: boolean;
  addToCartProductId?: string | null;
}
