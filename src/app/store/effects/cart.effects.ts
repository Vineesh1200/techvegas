import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../../services/products.service';
import { catchError, concatMap, exhaustMap, forkJoin, map, mergeMap, of, switchMap } from 'rxjs';
import { CartsActions } from '../action/cart.actions';
import { CartsService } from '../../services/carts.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})

export class CartsEffects {

  private actions$ = inject(Actions);
  private cartsService = inject(CartsService);
  private productsService = inject(ProductsService);
  private nzMessageService = inject(NzMessageService);

  constructor() { }

  loadCarts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartsActions.getCarts),
      exhaustMap(({ userId }) =>
        this.cartsService.getCarts(userId).pipe(
          switchMap((cart: any) => {
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
    concatMap(({ userId, addCartData }) => this.cartsService.getUpdateCarts(userId, addCartData).pipe(
      map((product) => {
        this.nzMessageService.success('Product added from cart.')
        return CartsActions.addCartsSuccess({ updatedProductByCart: product.products[0] })
      }),
      catchError((error) => of(CartsActions.failedCartsApi({ errorMessage: error.message })))
    ))
  ))

  loadDeleteCart$ = createEffect(() => this.actions$.pipe(
    ofType(CartsActions.deleteCarts),
    mergeMap(({ userId, deletedProductByCart }) => this.cartsService.getUpdateCarts(userId, deletedProductByCart).pipe(
      map(() => {
        this.nzMessageService.success('Product removed from cart.')
        return CartsActions.deleteCartsSuccess({ deletedProductByCart: deletedProductByCart.products[0] })
      }),
      catchError((error) => of(CartsActions.failedCartsApi({ errorMessage: error.message })))
    ))
  ))

}
