import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-users-cards',
  templateUrl: './users-cards.component.html',
  styleUrls: ['./users-cards.component.scss'],
})
export class UsersCardsComponent {
  @Input() data: User[] = [];
  @Input() loading = false;

  constructor() {}

  getTag(user: User): string {
    const msInAday = 1000 * 60 * 60 * 24;
    const currentDateInMS = Date.now();
    const createdDate = new Date(user.created!);
    const createdDateInMS = createdDate.getTime();
    const diffTime = currentDateInMS - createdDateInMS;
    if (diffTime <= msInAday) return 'beginner';
    if (diffTime <= 50 * msInAday) return 'intermediate';
    if (diffTime <= 150 * msInAday) return 'advanced';
    if (diffTime > 250 * msInAday) return 'expert';
    return 'beginner';
  }
}
