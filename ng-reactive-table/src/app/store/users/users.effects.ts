import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import {
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  patchUser,
  patchUserFailure,
  patchUserSuccess,
  postUser,
  postUserFailure,
  postUserSuccess,
  putUser,
  putUserFailure,
  putUserSuccess,
} from './users.actions';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      exhaustMap(() =>
        this.usersService.getUsers().pipe(
          map((data) => loadUsersSuccess({ data })),
          catchError(() => {
            const errorDescription = 'Error from API call: could not get users';
            this._snackBar.open(errorDescription, 'Close', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            return of(
              loadUsersFailure({
                error: {
                  description: errorDescription,
                  action: 'loadUsers',
                },
              })
            );
          })
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(({ userId }) =>
        this.usersService.deleteUser(userId).pipe(
          map(() => deleteUserSuccess({ userId })),
          catchError(() => {
            const errorDescription =
              'Error from API call: could not delete user';
            this._snackBar.open(errorDescription, 'Close', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            return of(
              deleteUserFailure({
                error: {
                  description: errorDescription,
                  action: 'deleteUser',
                  userId,
                },
              })
            );
          })
        )
      )
    )
  );

  postUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postUser),
      mergeMap(({ user: requestBodyUser }) =>
        this.usersService.postUser(requestBodyUser).pipe(
          map((createdUser) => postUserSuccess({ user: createdUser })), // newly created user has an id
          catchError(() => {
            const errorDescription = 'Error from API call: could not post user';
            this._snackBar.open(errorDescription, 'Close', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            return of(
              postUserFailure({
                error: {
                  description: errorDescription,
                  action: 'postUser',
                },
              })
            );
          })
        )
      )
    )
  );

  patchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(patchUser),
      mergeMap(({ user }) =>
        this.usersService.patchUser(user).pipe(
          map(() => patchUserSuccess({ user })),
          catchError(() => {
            const errorDescription =
              'Error from API call: could not patch user';
            this._snackBar.open(errorDescription, 'Close', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            return of(
              patchUserFailure({
                error: {
                  description: errorDescription,
                  action: 'patchUser',
                  userId: user.id,
                },
              })
            );
          })
        )
      )
    )
  );

  putUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(putUser),
      mergeMap(({ user }) =>
        this.usersService.putUser(user).pipe(
          map(() => putUserSuccess({ user })),
          catchError(() => {
            const errorDescription = 'Error from API call: could not put user';
            this._snackBar.open(errorDescription, 'Close', {
              horizontalPosition: 'center',
              verticalPosition: 'top',
            });
            return of(
              putUserFailure({
                error: {
                  description: errorDescription,
                  action: 'putUser',
                  userId: user.id,
                },
              })
            );
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private usersService: UserService,
    private _snackBar: MatSnackBar
  ) {}
}
