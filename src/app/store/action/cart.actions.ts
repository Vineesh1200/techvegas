import { createActionGroup, props } from '@ngrx/store';
import { ProductInterface } from '../../interfaces/product-interface';
import { CartInterface } from '../../interfaces/cart-interface';
import { Update } from '@ngrx/entity';

export const CartsActions = createActionGroup({
  source: 'Carts',
  events: {
    'Get Carts': props<{ userId: number }>(),
    'Get Carts Success': props<{ cartProducts: ProductInterface[] }>(),
    'Delete Carts': props<{ userId: number, updateCartData: CartInterface, deletedProductByCart: ProductInterface }>(),
    'Delete Carts Success': props<{ deletedProductByCart: ProductInterface }>(),
    'Add Carts': props<{ userId: number, addCartData: CartInterface }>(),
    'Add Carts Success': props<{ updatedProductByCart: Update<ProductInterface> }>(),
    'Failed Carts Api': props<{ errorMessage: string }>(),
  }
});