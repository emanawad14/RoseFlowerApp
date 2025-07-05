import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Product, ProductModel } from '../../features/interfaces/products';

export const ProductsAdapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: (Products) => Products._id
});
export const initialState:ProductModel = ProductsAdapter.getInitialState({
  errorMsg: '',
  isLoading: false
})

