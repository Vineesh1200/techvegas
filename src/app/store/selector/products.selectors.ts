import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as ProductsReducer from '../reducer/products.reducer';

export const selectProductsState = createFeatureSelector<ProductsReducer.ProductsState>(
    ProductsReducer.productsFeatureKey
)

export const selectedProducts = createSelector(
    selectProductsState,
    ProductsReducer.selectAllProducts
)

export const selectSingleProductState = createFeatureSelector<ProductsReducer.ProductsState>(
    ProductsReducer.singleProductFeatureKey
)

export const selectedSingleProduct = createSelector(
    selectSingleProductState,
    ProductsReducer.selectAllSingleProduct
)