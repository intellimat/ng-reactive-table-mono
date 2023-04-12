import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RequestBodyUser } from 'src/app/models/user.model';
import { postUser } from 'src/app/store/users/users.actions';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent {
  addUserFormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    department: ['', [Validators.required]],
  });

  constructor(private store: Store, private formBuilder: FormBuilder) {}

  onSubmit() {
    const user = {
      name: this.addUserFormGroup.get('name')?.value,
      email: this.addUserFormGroup.get('email')?.value,
      department: this.addUserFormGroup.get('department')?.value,
      created: new Date().toISOString(),
    } as unknown as RequestBodyUser;
    this.store.dispatch(postUser({ user }));
  }
}
