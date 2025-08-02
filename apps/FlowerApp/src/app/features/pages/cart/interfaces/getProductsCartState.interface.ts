import { AddToCartResponseDTO } from './addToCartResponse.interface';

export interface cartStateInterface {
  isLoading: boolean;
  error: string | null;
  data: AddToCartResponseDTO | null;
}
