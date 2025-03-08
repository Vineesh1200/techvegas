import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CartsActions } from '../action/cart.actions';

export const cartsFeatureKey = 'Carts';

export interface CartsState extends EntityState<any> {
  errorMessage: string
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: CartsState = adapter.getInitialState({
  errorMessage: ''
});

export const cartsReducer = createReducer(
  initialState,
  on(CartsActions.getCartsSuccess, (state: CartsState, { cartProducts }) => (adapter.setAll(cartProducts, { ...state, errorMessage: '' }))),
  on(CartsActions.addCartsSuccess, (state: CartsState, { updatedProductByCart }) => (adapter.addOne(updatedProductByCart, { ...state, errorMessage: '' }))),
  on(CartsActions.deleteCartsSuccess, (state: CartsState, { deletedProductByCart }) => (adapter.removeOne(deletedProductByCart.id, { ...state, errorMessage: '' }))),
  on(CartsActions.failedCartsApi, (state: CartsState, { errorMessage }) => ({ ...state, categories: state.entities, errorMessage: errorMessage })),
);

export const { selectAll: selectAllCarts, selectEntities: selectCartsEntities, selectIds: selectCartsIds, selectTotal: selectCartsTotal } = adapter.getSelectors();