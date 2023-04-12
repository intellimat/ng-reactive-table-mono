import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersMainComponent } from './users-main.component';
import { UsersCardsComponent } from './users-cards/users-cards.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UsersMainComponent,
    UsersCardsComponent,
    UsersTableComponent,
    AddUserDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatButtonToggleModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
    SharedModule,
  ],
  exports: [UsersMainComponent],
})
export class UsersMainModule {}
