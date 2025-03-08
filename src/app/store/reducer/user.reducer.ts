import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProductInterface } from '../../interfaces/product-interface';
import { UserActions } from '../action/user.actions';

export const userFeatureKey = 'user';

export interface UserState extends EntityState<ProductInterface> {
  errorMessage: string
}

export const adapter: EntityAdapter<ProductInterface> = createEntityAdapter<ProductInterface>();

export const initialState: UserState = adapter.getInitialState({
  errorMessage: ''
});

export const userReducer = createReducer(
  initialState,
  on(UserActions.getUserSuccess, (state: UserState, { user }) => (adapter.setAll([user], { ...state, errorMessage: '' }))),
  on(UserActions.updateUserSuccess, (state: UserState, { user }) => (adapter.updateOne(user, { ...state, errorMessage: '' }))),
  on(UserActions.failedUserApi, (state: UserState, { errorMessage }) => ({ ...state, categories: state.entities, errorMessage: errorMessage })),
);

export const { selectAll: selectAllUser, selectEntities: selectUserEntities, selectIds: selectUserIds, selectTotal: selectUserTotal } = adapter.getSelectors();