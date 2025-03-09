import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { ProductInterface } from '../../interfaces/product-interface';
import { ProductsActions, ProductsByCategoryActions, SingleProductActions } from '../action/products.actions';

export const productsFeatureKey = 'products';
export const productsByCategoryFeatureKey = 'productsByCategory';
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
  on(ProductsActions.getProductsSuccess, (state: ProductsState, { products }) => (adapter.setAll(products, { ...state, errorMessage: '' }))),
  on(ProductsActions.failedProductsApi, (state: ProductsState, { errorMessage }) => ({ ...state, products: state.entities, errorMessage: errorMessage })),
);

export const { selectAll: selectAllProducts, selectEntities: selectProductsEntities, selectIds: selectProductsIds, selectTotal: selectProductsTotal } = adapter.getSelectors();


export interface ProductsByCategoryState extends EntityState<ProductInterface> {
  errorMessage: string
}

export const adapter1: EntityAdapter<ProductInterface> = createEntityAdapter<ProductInterface>();

export const initialState1: ProductsByCategoryState = adapter1.getInitialState({
  errorMessage: ''
});

export const productsByCategoryReducer = createReducer(
  initialState1,
  on(ProductsByCategoryActions.getProductsByCategorySuccess, (state: ProductsByCategoryState, { productsByCategory }) => (adapter1.setAll(productsByCategory, { ...state, errorMessage: '' }))),
  on(ProductsByCategoryActions.failedProductsByCategoryApi, (state: ProductsByCategoryState, { errorMessage }) => ({ ...state, productsByCategory: state.entities, errorMessage: errorMessage })),
);

export const { selectAll: selectAllProductsByCategory, selectEntities: selectProductsByCategoryEntities, selectIds: selectProductsByCategoryIds, selectTotal: selectProductsByCategoryTotal } = adapter1.getSelectors();


export interface SingleProductState extends EntityState<ProductInterface> {
  errorMessage: string
}

export const adapter2: EntityAdapter<ProductInterface> = createEntityAdapter<ProductInterface>();

export const initialState2: SingleProductState = adapter2.getInitialState({
  errorMessage: ''
});

export const singleProductReducer = createReducer(
  initialState2,
  on(SingleProductActions.getSingleProductSuccess, (state: SingleProductState, { singleProduct }) => (adapter2.setAll([singleProduct], { ...state, errorMessage: '' }))),
  on(SingleProductActions.updateSingleProductCartSuccess, (state: SingleProductState, { singleProduct }) => adapter2.updateOne(singleProduct, { ...state, errorMessage: '' })),
  on(SingleProductActions.failedSingleProductApi, (state: SingleProductState, { errorMessage }) => ({ ...state, singleProduct: state.entities, errorMessage: errorMessage })),
);

export const { selectAll: selectAllSingleProduct, selectEntities: selectSingleProductEntities, selectIds: selectSingleProductIds, selectTotal: selectSingleProductTotal } = adapter2.getSelectors();