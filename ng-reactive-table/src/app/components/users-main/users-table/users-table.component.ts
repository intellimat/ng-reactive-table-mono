import { Component, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { EditableUser, User } from 'src/app/models/user.model';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { deleteUser, patchUser } from 'src/app/store/users/users.actions';
import { usersFeature } from 'src/app/store/users/usersFeature';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnChanges {
  @Input() data: User[] = [];
  @Input() loading = false;
  idsOfUsersBeingUpdated = this.store.select(
    usersFeature.selectIdsOfUsersBeingUpdated
  );
  tableData = this.parseInputData();
  displayedColumns = ['id', 'name', 'email', 'department', 'operations'];
  tableFormGroup = this.generateTableFormGroup([]);
  valuesBeforeEditing = new Map<number, EditableUser>();

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    public dialog: MatDialog
  ) {}

  ngOnChanges() {
    this.tableData = this.parseInputData();
    const formArray = this.tableData.map((user) => this.createFormGroup(user));
    this.tableFormGroup = this.generateTableFormGroup(formArray);
  }

  private generateTableFormGroup(formArray: FormGroup[]) {
    return this.formBuilder.group({
      tableRows: this.formBuilder.array<FormGroup>(formArray),
    });
  }

  private createFormGroup(user: User): FormGroup {
    return this.formBuilder.group({
      id: [user.id],
      name: [user.name, Validators.required],
      email: [user.email, [Validators.email, Validators.required]],
      department: [user.department, [Validators.required]],
    });
  }

  get tableRows() {
    return this.tableFormGroup.get('tableRows') as FormArray;
  }

  private parseInputData(): EditableUser[] {
    return this.data.map((user) => ({
      ...user,
      isEditable: false,
    }));
  }

  openDialog({ id: userId }: EditableUser): void {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Delete user',
        question: 'Are you sure to delete this user?',
        cancelText: 'No',
        confirmationText: ' Yes',
        onConfirmation: () => this.store.dispatch(deleteUser({ userId })),
      },
    });
  }

  onEdit(user: EditableUser, rowIndex: number) {
    if (user.isEditable) {
      const updatedUser = this.tableRows
        .at(rowIndex)
        .getRawValue() as EditableUser;
      this.store.dispatch(
        patchUser({
          user: {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            department: updatedUser.department,
          },
        })
      );
    }
    user.isEditable = !user.isEditable;
  }

  onCancel(user: EditableUser) {
    user.isEditable = !user.isEditable;
  }
}
