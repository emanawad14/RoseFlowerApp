import { AddToCartResponseDTO } from './addToCartResponse.interface';

export interface cartStateInterface {
  isLoading: boolean;
  error: string | null;
  numberOfCartItems:number;
  data: AddToCartResponseDTO | null;
}
