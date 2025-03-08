import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { ProductInterface } from '../../interfaces/product-interface';
import { UsersService } from '../../services/users.service';
import { UserActions } from '../action/user.actions';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})

export class UserEffects {

  private actions$ = inject(Actions);
  private usersService = inject(UsersService);

  constructor() { }

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.getUser),
    exhaustMap(({ userId }) => this.usersService.getSingleUser(userId).pipe(
      map((user: any) => {
        return (UserActions.getUserSuccess({ user: user }))
      }),
      catchError((error) => of(UserActions.failedUserApi({ errorMessage: error.message })))
    ))
  ))

  loadUpdateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.updateUser),
    switchMap(({ userId, user }) => this.usersService.updateSingleUser(userId, user).pipe(
      map((user) => {
        const updateUser:Update<ProductInterface> = {
          id: user.id,
          changes: user
        }
        return (UserActions.updateUserSuccess({ user: updateUser }))
      }),
      catchError((error) => of(UserActions.failedUserApi({ errorMessage: error.message })))
    ))
  ))

}
