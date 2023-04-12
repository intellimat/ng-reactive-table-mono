import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CardComponent, ConfirmationDialogComponent],
  imports: [CommonModule, MatCardModule, MatDialogModule, MatButtonModule],
  exports: [CardComponent, ConfirmationDialogComponent],
})
export class SharedModule {}
