import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProductInterface } from '../../interfaces/product-interface';
import { ProductsActions } from '../action/products.actions';

export const productsFeatureKey = 'products';

export interface ProductsState extends EntityState<ProductInterface> {
  errorMessage: string
}

export const adapter: EntityAdapter<ProductInterface> = createEntityAdapter<ProductInterface>();

export const initialState: ProductsState = adapter.getInitialState({
  errorMessage: ''
});

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.getProductsByCategorySuccess, (state: ProductsState, { products }) => (adapter.setAll(products, { ...state, errorMessage: '' }))),
  on(ProductsActions.failedProductsByCategoryApi, (state: ProductsState, { errorMessage }) => ({ ...state, categories: state.entities, errorMessage: errorMessage })),
);

export const { selectAll: selectAllProducts, selectEntities: selectProductsEntities, selectIds: selectProductsIds, selectTotal: selectProductsTotal } = adapter.getSelectors();