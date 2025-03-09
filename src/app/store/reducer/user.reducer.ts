import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { UserActions } from '../action/user.actions';
import { ProfileInterface } from '../../interfaces/profile-interface';

export const userFeatureKey = 'user';

export interface UserState extends EntityState<ProfileInterface> {
  loading: boolean
  errorMessage: string
}

export const adapter: EntityAdapter<ProfileInterface> = createEntityAdapter<ProfileInterface>();

export const initialState: UserState = adapter.getInitialState({
  loading: false,
  errorMessage: '',
});

export const userReducer = createReducer(
  initialState,
  on(UserActions.getUserSuccess, (state: UserState, { user }) => (adapter.setAll([user], { ...state, errorMessage: '' }))),
  on(UserActions.updateUser, (state: UserState) => ({ ...state, loading: true, errorMessage: '' })),
  on(UserActions.updateUserSuccess, (state: UserState, { user }) => (adapter.updateOne(user, { ...state, loading: false, errorMessage: '' }))),
  on(UserActions.failedUserApi, (state: UserState, { errorMessage }) => ({ ...state, user: state.entities, errorMessage: errorMessage })),
);

export const { selectAll: selectAllUser, selectEntities: selectUserEntities, selectIds: selectUserIds, selectTotal: selectUserTotal } = adapter.getSelectors();