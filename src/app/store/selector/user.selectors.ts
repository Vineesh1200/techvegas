import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as UserReducer from '../reducer/user.reducer';

export const selectUserState = createFeatureSelector<UserReducer.UserState>(
    UserReducer.userFeatureKey
)

export const selectedUser = createSelector(
    selectUserState,
    UserReducer.selectAllUser
)

export const selectedUserUpdateLoading = createSelector(
    selectUserState,
    (state => state.loading)
)

export const selectedUserErrorMessage = createSelector(
    selectUserState,
    (state => state.errorMessage)
)