import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as CategoriesReducer from '../reducer/categories.reducer';

export const selectCategoriesState = createFeatureSelector<CategoriesReducer.CategoriesState>(
    CategoriesReducer.categoriesFeatureKey
)

export const selectedCategories = createSelector(
    selectCategoriesState,
    CategoriesReducer.selectAllCategories
)