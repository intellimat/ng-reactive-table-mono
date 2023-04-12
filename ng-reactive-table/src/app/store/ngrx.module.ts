import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { usersFeature } from './users/usersFeature';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './users/users.effects';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(usersFeature),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([UsersEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      // logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true,
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    MatSnackBarModule,
  ],
})
export class NgrxModule {}
