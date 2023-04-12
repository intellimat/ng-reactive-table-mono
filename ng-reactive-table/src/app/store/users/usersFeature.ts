import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import {
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  HttpCallError,
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
  setSearchWord,
} from './users.actions';

interface UsersState {
  data: User[];
  searchWord: string;
  loading: boolean;
  errors: HttpCallError[];
  idsOfUsersBeingUpdated: number[];
}

const initialState: UsersState = {
  data: [],
  loading: false,
  searchWord: '',
  errors: [],
  idsOfUsersBeingUpdated: [],
};

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(loadUsers, (state) => ({
      ...state,
      loading: true,
    })),
    on(loadUsersSuccess, (state, { data }) => ({
      ...state,
      data,
      errors: state.errors.filter((error) => error.action !== 'loadUsers'),
      loading: false,
    })),
    on(loadUsersFailure, (state, { error }) => ({
      ...state,
      loading: false,
      errors: [...state.errors, error],
    })),
    on(deleteUser, (state, { userId }) => ({
      ...state,
      idsOfUsersBeingUpdated: [...state.idsOfUsersBeingUpdated, userId],
    })),
    on(deleteUserSuccess, (state, { userId }) => ({
      ...state,
      data: state.data.filter((user) => user.id !== userId),
      idsOfUsersBeingUpdated: state.idsOfUsersBeingUpdated.filter(
        (id) => id !== userId
      ),
      errors: state.errors.filter(
        (error) => error.action !== 'deleteUser' && error.userId === userId
      ),
    })),
    on(deleteUserFailure, (state, { error }) => ({
      ...state,
      idsOfUsersBeingUpdated: state.idsOfUsersBeingUpdated.filter(
        (id) => id !== error.userId
      ),
      errors: [...state.errors, error],
    })),
    on(postUser, (state) => ({
      ...state,
    })),
    on(postUserSuccess, (state, { user }) => ({
      ...state,
      data: [...state.data, user],
      errors: state.errors.filter((error) => error.action !== 'postUser'),
    })),
    on(postUserFailure, (state, { error }) => ({
      ...state,
      errors: [...state.errors, error],
    })),
    on(patchUser, (state, { user }) => ({
      ...state,
      idsOfUsersBeingUpdated: [...state.idsOfUsersBeingUpdated, user.id],
    })),
    on(patchUserSuccess, (state, { user: patchedUser }) => ({
      ...state,
      data: state.data.map((user) => {
        if (user.id === patchedUser.id) return patchedUser;
        else return user;
      }),
      idsOfUsersBeingUpdated: state.idsOfUsersBeingUpdated.filter(
        (id) => id !== patchedUser.id
      ),
      errors: state.errors.filter(
        (error) =>
          error.action !== 'patchUser' && error.userId === patchedUser.id
      ),
    })),
    on(patchUserFailure, (state, { error }) => ({
      ...state,
      idsOfUsersBeingUpdated: state.idsOfUsersBeingUpdated.filter(
        (id) => id !== error.userId
      ),
      errors: [...state.errors, error],
    })),
    on(putUser, (state, { user }) => ({
      ...state,
      idsOfUsersBeingUpdated: [...state.idsOfUsersBeingUpdated, user.id],
    })),
    on(putUserSuccess, (state, { user: putUser }) => ({
      ...state,
      data: state.data.map((user) => {
        if (user.id === putUser.id) return putUser;
        else return user;
      }),
      idsOfUsersBeingUpdated: state.idsOfUsersBeingUpdated.filter(
        (id) => id !== putUser.id
      ),
      errors: state.errors.filter(
        (error) => error.action !== 'putUser' && error.userId === putUser.id
      ),
    })),
    on(putUserFailure, (state, { error }) => ({
      ...state,
      idsOfUsersBeingUpdated: state.idsOfUsersBeingUpdated.filter(
        (id) => id !== error.userId
      ),
      errors: [...state.errors, error],
    })),
    on(setSearchWord, (state, { searchWord }) => ({
      ...state,
      searchWord,
    }))
  ),
});
