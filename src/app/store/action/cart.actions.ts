import { createActionGroup, props } from '@ngrx/store';
import { ProductInterface } from '../../interfaces/product-interface';
import { CartInterface } from '../../interfaces/cart-interface';

export const CartsActions = createActionGroup({
  source: 'Carts',
  events: {
    'Get Carts': props<{ userId: number }>(),
    'Get Carts Success': props<{ cartProducts: ProductInterface[] }>(),
    'Delete Carts': props<{ userId: number, deletedProductByCart: CartInterface }>(),
    'Delete Carts Success': props<{ deletedProductByCart: ProductInterface }>(),
    'Add Carts': props<{ userId: number, addCartData: CartInterface }>(),
    'Add Carts Success': props<{ updatedProductByCart: ProductInterface }>(),
    'Failed Carts Api': props<{ errorMessage: string }>(),
  }
});