import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProductInterface } from '../../interfaces/product-interface';
import { ProductsActions, SingleProductActions } from '../action/products.actions';

export const productsFeatureKey = 'products';
export const singleProductFeatureKey = 'singleProduct';

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
  on(ProductsActions.failedProductsByCategoryApi, (state: ProductsState, { errorMessage }) => ({ ...state, products: state.entities, errorMessage: errorMessage })),
);

export const { selectAll: selectAllProducts, selectEntities: selectProductsEntities, selectIds: selectProductsIds, selectTotal: selectProductsTotal } = adapter.getSelectors();


export interface SingleProductState extends EntityState<ProductInterface> {
  errorMessage: string
}

export const adapter2: EntityAdapter<ProductInterface> = createEntityAdapter<ProductInterface>();

export const initialState2: SingleProductState = adapter.getInitialState({
  errorMessage: ''
});

export const singleProductReducer = createReducer(
  initialState2,
  on(SingleProductActions.getSingleProductSuccess, (state: SingleProductState, { singleProduct }) => (adapter.setAll([singleProduct], { ...state, errorMessage: '' }))),
);

export const { selectAll: selectAllSingleProduct, selectEntities: selectSingleProductEntities, selectIds: selectSingleProductIds, selectTotal: selectSingleProductTotal } = adapter2.getSelectors();