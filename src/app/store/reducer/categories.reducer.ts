import { createReducer, on } from '@ngrx/store';
import { CategoriesActions } from '../action/categories.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export const categoriesFeatureKey = 'categories';

export interface CategoriesState extends EntityState<string> {
  errorMessage: string
}

export const adapter: EntityAdapter<string> = createEntityAdapter<string>({
  selectId: (category: string) => category,
});

export const initialState: CategoriesState = adapter.getInitialState({
  errorMessage: ''
});

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.getCategoriesSuccess, (state: CategoriesState, { categories }) => (adapter.setAll(categories, { ...state, errorMessage: '' }))),
  on(CategoriesActions.failedCategoriesApi, (state: CategoriesState, { errorMessage }) => ({ ...state, categories: state.entities, errorMessage: errorMessage })),
);

export const { selectAll: selectAllCategories, selectEntities: selectUserEntities, selectIds: selectUserIds, selectTotal: selectUserTotal } = adapter.getSelectors();