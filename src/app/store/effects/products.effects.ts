import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../../services/products.service';
import { ProductsActions, ProductsByCategoryActions, SingleProductActions } from '../action/products.actions';
import { catchError, exhaustMap, map, of, switchMap, take } from 'rxjs';
import { ProductInterface } from '../../interfaces/product-interface';
import { Store } from '@ngrx/store';
import { selectedCartProducts } from '../selector/cart.selectors';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})

export class ProductsEffects {

  private actions$ = inject(Actions);
  private store$ = inject(Store);
  private productsService = inject(ProductsService);

  constructor() { }

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.getProducts),
    exhaustMap(() => this.productsService.getProducts().pipe(
      map((products: ProductInterface[]) => {
        return (ProductsActions.getProductsSuccess({ products }));
      }),
      catchError((error) => of(ProductsActions.failedProductsApi({ errorMessage: error.message })))
    ))
  ))

  loadProductsByCategory$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsByCategoryActions.getProductsByCategory),
    exhaustMap(({ category }) => this.productsService.getProductsByCategory(category).pipe(
      map((productsByCategory: ProductInterface[]) => {
        return (ProductsByCategoryActions.getProductsByCategorySuccess({ productsByCategory }))
      }),
      catchError((error) => of(ProductsByCategoryActions.failedProductsByCategoryApi({ errorMessage: error.message })))
    ))
  ))

  loadSingleProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SingleProductActions.getSingleProduct),
      exhaustMap(({ productId }) =>
        this.productsService.getSingleProducts(productId).pipe(
          switchMap((singleProduct: ProductInterface) =>
            this.store$.select(selectedCartProducts).pipe(
              take(1),
              map((products: ProductInterface[]) => {
                const isAddedCart = products.some((product) => product.id === singleProduct.id);
                const updatedSingleProduct = {
                  ...singleProduct,
                  isAddedCart,
                };
                return SingleProductActions.getSingleProductSuccess({ singleProduct: updatedSingleProduct });
              })
            )
          ),
          catchError((error) =>
            of(SingleProductActions.failedSingleProductApi({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  loadUpdateSingleproductCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SingleProductActions.updateSingleProductCart),
      map((action) => {
        const updateUser: Update<ProductInterface> = {
          id: action.id,
          changes: action.changes,
        };
        return SingleProductActions.updateSingleProductCartSuccess({
          singleProduct: updateUser,
        });
      }),
      catchError((error) =>
        of(
          SingleProductActions.failedSingleProductApi({
            errorMessage: error.message,
          })
        )
      )
    )
  );

}
