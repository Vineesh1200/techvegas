import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as ProductsReducer from '../reducer/products.reducer';

export const selectProductsState = createFeatureSelector<ProductsReducer.ProductsState>(
    ProductsReducer.productsFeatureKey
)

export const selectedProducts = createSelector(
    selectProductsState,
    ProductsReducer.selectAllProducts
)

export const selectProductsByCategoryState = createFeatureSelector<ProductsReducer.ProductsByCategoryState>(
    ProductsReducer.productsByCategoryFeatureKey
)

export const selectedProductsByCategory = createSelector(
    selectProductsByCategoryState,
    ProductsReducer.selectAllProductsByCategory
)

export const selectSingleProductState = createFeatureSelector<ProductsReducer.SingleProductState>(
    ProductsReducer.singleProductFeatureKey
)

export const selectedSingleProduct = createSelector(
    selectSingleProductState,
    ProductsReducer.selectAllSingleProduct
)