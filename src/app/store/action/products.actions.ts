import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ProductInterface } from '../../interfaces/product-interface';
import { Update } from '@ngrx/entity';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Get Products': emptyProps(),
    'Get Products Success': props<{ products: ProductInterface[] }>(),
    'Failed Products Api': props<{ errorMessage: string }>(),
  }
});

export const ProductsByCategoryActions = createActionGroup({
  source: 'ProductsByCategory',
  events: {
    'Get Products By Category': props<{ category: string }>(),
    'Get Products By Category Success': props<{ productsByCategory: ProductInterface[] }>(),
    'Failed Products By Category Api': props<{ errorMessage: string }>(),
  }
});

export const SingleProductActions = createActionGroup({
  source: 'SingleProduct',
  events: {
    'Get Single Product': props<{ productId: number }>(),
    'Get Single Product Success': props<{ singleProduct: ProductInterface }>(),
    'Update Single Product Cart': props<{ id: number; changes: Partial<ProductInterface> }>(),
    'Update Single Product Cart Success': props<{ singleProduct: Update<ProductInterface> }>(),
    'Failed Single Product Api': props<{ errorMessage: string }>(),
  }
});