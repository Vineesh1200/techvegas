import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as ProductsReducer from '../reducer/products.reducer';
import * as SingleProductReducer from '../reducer/products.reducer';

export const selectProductsState = createFeatureSelector<ProductsReducer.ProductsState>(
    ProductsReducer.productsFeatureKey
)

export const selectedProducts = createSelector(
    selectProductsState,
    ProductsReducer.selectAllProducts
)

export const selectSingleProductState = createFeatureSelector<SingleProductReducer.ProductsState>(
    SingleProductReducer.productsFeatureKey
)

export const selectedSingleProduct = createSelector(
    selectSingleProductState,
    SingleProductReducer.selectAllSingleProduct
)