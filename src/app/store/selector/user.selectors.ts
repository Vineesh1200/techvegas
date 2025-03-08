import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as UserReducer from '../reducer/user.reducer';

export const selectUserState = createFeatureSelector<UserReducer.UserState>(
    UserReducer.userFeatureKey
)

export const selectedUser = createSelector(
    selectUserState,
    UserReducer.selectAllUser
)