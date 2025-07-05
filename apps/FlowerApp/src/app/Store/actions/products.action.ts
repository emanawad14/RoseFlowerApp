import { createAction, props } from "@ngrx/store"
import { ProductResponse } from "../../features/interfaces/products"

export const loadProducts = createAction("[Products page] load Products")
export const loadProductsSuccess = createAction("[Products page] load Products Success", props<{list: ProductResponse}>())
export const loadProductsFail = createAction("[Products page] load Products Fail", props<{errorMsg: string}>())

export const addProducts = createAction("[Products page] Add Products", props<{inputData: ProductResponse}>())
export const addProductsSuccess = createAction("[Products page] Add Products Success", props<{inputData: ProductResponse}>())
export const addProductsFail = createAction("[Products page] Add Products Fail", props<{errorMsg: string}>())

export const editProducts = createAction("[Products page] Edit Products", props<{inputData: ProductResponse, id: number}>())
export const editProductsSuccess = createAction("[Products page] Edit Products Success", props<{inputData: ProductResponse, id: number}>())
export const editProductsFail = createAction("[Products page] Edit Products Fail", props<{errorMsg: string}>())

export const deleteProducts = createAction("[Products page] Delete Products", props<{ id: number}>())
export const deleteProductsSuccess = createAction("[Products page] Delete Products Success", props<{inputData: ProductResponse, id: number}>())
export const deleteProductsFail = createAction("[Products page] Delete Products Fail", props<{errorMsg: string}>())

