import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgrxModule } from './store/ngrx.module';
import { UsersMainModule } from './components/users-main/users-main.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgrxModule,
    UsersMainModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
