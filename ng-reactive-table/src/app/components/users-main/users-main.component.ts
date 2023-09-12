import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs';
import { loadUsers, setSearchWord } from 'src/app/store/users/users.actions';
import {
  selectPaginatedFilteredUsers,
  selectFilteredUsers,
} from 'src/app/store/users/users.custom-selectors';
import { usersFeature } from 'src/app/store/users/usersFeature';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { paginatorConfig } from './paginator.config';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-main.component.html',
  styleUrls: ['./users-main.component.scss'],
})
export class UsersMainComponent implements OnInit {
  loading$ = this.store.select(usersFeature.selectLoading);
  search = new FormControl<string>('');
  view = 'cardsView';

  pageSize = paginatorConfig.pageSize;
  pageSizeOptions = paginatorConfig.pageSizeOptions;
  pageIndex = 0;
  paginatedData$ = this.store.select(
    selectPaginatedFilteredUsers(this.pageIndex, this.pageSize)
  );

  filteredDataLength$ = this.store
    .select(selectFilteredUsers)
    .pipe(map((users) => users.length));

  @ViewChild('paginator') paginator?: MatPaginator;

  constructor(private store: Store, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.updateUsersState();
  }

  onChange(event: MatButtonToggleChange) {
    this.view = event.value;
  }

  onAddUser() {
    this.dialog.open(AddUserDialogComponent, {
      width: '400px',
    });
  }

  private goToFirstPage() {
    this.pageIndex = 0;
    this.paginator?.firstPage();
  }

  private updateUsersState() {
    this.search.valueChanges
      .pipe(
        filter((searchWord) => searchWord !== null),
        map((searchWord) => searchWord as string),
        map((searchWord: string) => searchWord.toLowerCase())
      )
      .subscribe((searchWord) => {
        this.goToFirstPage();
        this.store.dispatch(setSearchWord({ searchWord }));
      });
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginatedData$ = this.store.select(
      selectPaginatedFilteredUsers(this.pageIndex, this.pageSize)
    );
  }
}
