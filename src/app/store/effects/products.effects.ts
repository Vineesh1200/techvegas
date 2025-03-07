import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../../services/products.service';
import { ProductsActions } from '../action/products.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ProductInterface } from '../../interfaces/product-interface';

@Injectable({
  providedIn: 'root'
})

export class ProductsEffects {

  private actions$ = inject(Actions);
  private productsService = inject(ProductsService);

  constructor() { }

  loadProductsByCategory$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActions.getProductsByCategory),
    exhaustMap(({ category }) => this.productsService.getProductsByCategory(category).pipe(
      map((products: ProductInterface[]) => {
        return (ProductsActions.getProductsByCategorySuccess({ products }))
      }),
      catchError((error) => of(ProductsActions.failedProductsByCategoryApi({ errorMessage: error.message })))
    ))
  ))

}
