import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as CartsReducer from '../reducer/cart.reducer';

export const selectCartProductsState = createFeatureSelector<CartsReducer.CartsState>(
    CartsReducer.cartsFeatureKey
)

export const selectedCartProducts = createSelector(
    selectCartProductsState,
    CartsReducer.selectAllCarts
)

export const selectedCartTotal = createSelector(
    selectCartProductsState,
    CartsReducer.selectCartsTotal
)

export const selectedCartLoading = createSelector(
    selectCartProductsState,
    (state => state.loading)
)

export const selectedCartErrorMessage = createSelector(
    selectCartProductsState,
    (state => state.errorMessage)
)