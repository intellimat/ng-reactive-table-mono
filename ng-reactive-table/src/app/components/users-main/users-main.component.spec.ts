import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { UsersCardsComponent } from './users-cards/users-cards.component';
import { UsersMainComponent } from './users-main.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
describe('UsersMainComponent', () => {
  let component: UsersMainComponent;
  let fixture: ComponentFixture<UsersMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersMainComponent, UsersCardsComponent],
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonToggleModule,
        MatInputModule,
        MatPaginatorModule,
      ],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
