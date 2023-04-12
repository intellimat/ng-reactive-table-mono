import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCardsComponent } from './users-cards.component';

describe('UsersCardsComponent', () => {
  let component: UsersCardsComponent;
  let fixture: ComponentFixture<UsersCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersCardsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
