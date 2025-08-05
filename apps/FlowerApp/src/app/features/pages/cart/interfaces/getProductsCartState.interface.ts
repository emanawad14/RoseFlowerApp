import { AddToCartResponseDTO } from './addToCartResponse.interface';

export interface cartStateInterface {
  isLoading: boolean;
  error: string | null;
  numberOfCartItems: number;
  data: AddToCartResponseDTO | null;
  addToCartLoading: boolean;
  addToCartProductId: string | null;
}

export interface CartStates {
  getProductsCartResponse?: AddToCartResponseDTO | null;
  isLoading?: boolean;
  error: any;
  numberOfItemsInCart: number;
  addToCartLoading?: boolean;
  addToCartProductId?: string | null;
}
