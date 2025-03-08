import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as CartsReducer from '../reducer/cart.reducer';

export const selectCartProductsState = createFeatureSelector<CartsReducer.CartsState>(
    CartsReducer.cartsFeatureKey
)

export const selectedCartProducts = createSelector(
    selectCartProductsState,
    CartsReducer.selectAllCarts
)