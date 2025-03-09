import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CartsActions } from '../action/cart.actions';

export const cartsFeatureKey = 'carts';

export interface CartsState extends EntityState<any> {
  loading: boolean
  errorMessage: string
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();

export const initialState: CartsState = adapter.getInitialState({
  loading: false,
  errorMessage: ''
});

export const cartsReducer = createReducer(
  initialState,
  on(CartsActions.getCartsSuccess, (state: CartsState, { cartProducts }) => (adapter.setAll(cartProducts, { ...state, errorMessage: '' }))),
  on(CartsActions.addCarts, (state: CartsState) => ({ ...state, loading: true, errorMessage: '' })),
  on(CartsActions.addCartsSuccess, (state: CartsState, { updatedProductByCart }) => (adapter.addOne(updatedProductByCart, { ...state, loading: false, errorMessage: '' }))),
  on(CartsActions.deleteCarts, (state: CartsState) => ({ ...state, loading: true, errorMessage: '' })),
  on(CartsActions.deleteCartsSuccess, (state: CartsState, { deletedProductByCart }) => (adapter.removeOne(deletedProductByCart.id, { ...state, loading: false, errorMessage: '' }))),
  on(CartsActions.failedCartsApi, (state: CartsState, { errorMessage }) => ({ ...state, carts: state.entities, errorMessage: errorMessage })),
);

export const { selectAll: selectAllCarts, selectEntities: selectCartsEntities, selectIds: selectCartsIds, selectTotal: selectCartsTotal } = adapter.getSelectors();