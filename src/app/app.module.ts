import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DifficultySelectorComponent } from './difficulty-selector/difficulty-selector.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  declarations: [AppComponent, DifficultySelectorComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
