import { createAction, props } from '@ngrx/store';
import { RequestBodyUser, User } from 'src/app/models/user.model';

export interface HttpCallError {
  description: string;
  action: 'loadUsers' | 'patchUser' | 'putUser' | 'postUser' | 'deleteUser';
  userId?: number;
}

export const loadUsers = createAction('[Users API] Load users');
export const loadUsersSuccess = createAction(
  '[Users API] Load users success',
  props<{ data: User[] }>()
);
export const loadUsersFailure = createAction(
  '[Users API] Load users failure',
  props<{ error: HttpCallError }>()
);

export const patchUser = createAction(
  '[Users API] Patch user',
  props<{ user: User }>()
);
export const patchUserSuccess = createAction(
  '[Users API] Patch user success',
  props<{ user: User }>()
);
export const patchUserFailure = createAction(
  '[Users API] Patch user failure',
  props<{ error: HttpCallError }>()
);

export const putUser = createAction(
  '[Users API] Put user',
  props<{ user: User }>()
);
export const putUserSuccess = createAction(
  '[Users API] Put user success',
  props<{ user: User }>()
);
export const putUserFailure = createAction(
  '[Users API] Put user failure',
  props<{ error: HttpCallError }>()
);

export const postUser = createAction(
  '[Users API] Post user',
  props<{ user: RequestBodyUser }>()
);
export const postUserSuccess = createAction(
  '[Users API] Post user success',
  props<{ user: User }>()
);
export const postUserFailure = createAction(
  '[Users API] Post user failure',
  props<{ error: HttpCallError }>()
);

export const deleteUser = createAction(
  '[Users API] Delete user',
  props<{ userId: number }>()
);
export const deleteUserSuccess = createAction(
  '[Users API] Delete user success',
  props<{ userId: number }>()
);
export const deleteUserFailure = createAction(
  '[Users API] Delete user failure',
  props<{ error: HttpCallError }>()
);

export const setSearchWord = createAction(
  '[Filter] Set search word',
  props<{ searchWord: string }>()
);
