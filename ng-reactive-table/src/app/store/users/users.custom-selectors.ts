import { createSelector } from '@ngrx/store';
import { usersFeature } from './usersFeature';

export const selectFilteredUsers = createSelector(
  usersFeature.selectUsersState,
  (state) =>
    state.data.filter(
      (user) =>
        user.email.trim().toLowerCase().includes(state.searchWord) ||
        user.name.trim().toLowerCase().includes(state.searchWord)
    )
);

export const selectPaginatedFilteredUsers = (
  pageIndex: number,
  pageSize: number
) => {
  return createSelector(selectFilteredUsers, (users) =>
    users.filter(
      (_, i) => i < (pageIndex + 1) * pageSize && i >= pageIndex * pageSize
    )
  );
};
