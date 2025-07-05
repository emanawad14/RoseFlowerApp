import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsAdapter } from "../state/products.state";
import { ProductModel } from "../../features/interfaces/products";

const getProductsState = createFeatureSelector<ProductModel>('Products');
const ProductsSelector = ProductsAdapter.getSelectors()

export const getProductsList = createSelector(getProductsState, ProductsSelector.selectAll)
const selectEntities = createSelector(getProductsState, ProductsSelector.selectEntities);
export const getProducts = (id: number) => createSelector(selectEntities, (state) => state[id]);
export const getErrorMsg = createSelector(getProductsState, state => state.errorMsg)
