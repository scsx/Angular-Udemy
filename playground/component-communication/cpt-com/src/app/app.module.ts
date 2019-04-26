import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EuropeComponent } from './europe/europe.component';
import { ItalyComponent } from './europe/italy/italy.component';
import { AfricaComponent } from './africa/africa.component';
import { GhanaComponent } from './africa/ghana/ghana.component';

@NgModule({
  declarations: [
    AppComponent,
    EuropeComponent,
    ItalyComponent,
    AfricaComponent,
    GhanaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
