import { Product } from '../../../interfaces/products';

export interface ProductDetailsDTO {
  message: string;
  product?: Product;
}

export interface ProductImage {
  cover?: string;
  images?: string[];
}


export interface RelatedProductsDTO {
  message: string;
  count: number;
  relatedProducts:Product[];
}
