import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../../services/products.service';
import { catchError, exhaustMap, forkJoin, map, mergeMap, of, switchMap } from 'rxjs';
import { ProductInterface } from '../../interfaces/product-interface';
import { CartsActions } from '../action/cart.actions';
import { CartsService } from '../../services/carts.service';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})

export class CartsEffects {

  private actions$ = inject(Actions);
  private cartsService = inject(CartsService);
  private productsService = inject(ProductsService);

  constructor() { }

  loadCarts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartsActions.getCarts),
      exhaustMap(({ userId }) =>
        this.cartsService.getCarts(userId).pipe(
          mergeMap((cart: any) => {
            const productIds = cart.products.map((product: any) => product.productId);
            const productRequests = productIds.map((productId: any) =>
              this.productsService.getSingleProducts(productId)
            );
            return forkJoin(productRequests).pipe(
              map((products: any) => {
                if (products && products.length > 0) {
                  return CartsActions.getCartsSuccess({ cartProducts: products });
                } else {
                  return CartsActions.failedCartsApi({
                    errorMessage: 'No products found for the given cart.',
                  });
                }
              }),
              catchError((error) => {
                return of(
                  CartsActions.failedCartsApi({ errorMessage: error.message })
                );
              })
            );
          }),
          catchError((error) =>
            of(CartsActions.failedCartsApi({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  loadAddCart$ = createEffect(() => this.actions$.pipe(
    ofType(CartsActions.addCarts),
    switchMap(({ userId, addCartData }) => this.cartsService.getUpdateCarts(userId, addCartData).pipe(
      map((product) => {
        const updatedCart: Update<ProductInterface> = {
          id: product.id,
          changes: product
        }
        return CartsActions.addCartsSuccess({ updatedProductByCart: updatedCart })
      }),
      catchError((error) => of(CartsActions.failedCartsApi({ errorMessage: error.message })))
    ))
  ))

  loadDeleteCart$ = createEffect(() => this.actions$.pipe(
    ofType(CartsActions.deleteCarts),
    mergeMap(({ userId, updateCartData, deletedProductByCart }) => this.cartsService.getUpdateCarts(userId, updateCartData).pipe(
      map(() => CartsActions.deleteCartsSuccess({ deletedProductByCart: deletedProductByCart })),
      catchError((error) => of(CartsActions.failedCartsApi({ errorMessage: error.message })))
    ))
  ))

}
