import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesActions } from '../action/categories.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { CategoriesService } from '../../services/categories.service';

@Injectable({
  providedIn: 'root'
})

export class CategoriesEffects {

  private actions$ = inject(Actions);
  private categoriesService = inject(CategoriesService);

  constructor() { }

  loadCategories$ = createEffect(() => this.actions$.pipe(
    ofType(CategoriesActions.getCategories),
    exhaustMap(() => this.categoriesService.getCategories().pipe(
      map((categories: string[]) => {
        return (CategoriesActions.getCategoriesSuccess({ categories }))
      }),
      catchError((error) => of(CategoriesActions.failedCategoriesApi({ errorMessage: error.message })))
    ))
  ))

}