import { createActionGroup, props } from '@ngrx/store';
import { ProductInterface } from '../../interfaces/product-interface';

export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Get Products By Category': props<{ category: string }>(),
    'Get Products By Category Success': props<{ products: ProductInterface[] }>(),
    'Failed Products By Category Api': props<{ errorMessage: string }>(),
  }
});