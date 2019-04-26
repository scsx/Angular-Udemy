import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EuropeComponent } from './europe/europe.component';
import { ItalyComponent } from './europe/italy/italy.component';
import { AfricaComponent } from './africa/africa.component';
import { GhanaComponent } from './africa/ghana/ghana.component';
import { AmericasComponent } from './americas/americas.component';
import { BrazilComponent } from './americas/brazil/brazil.component';
import { AsiaComponent } from './asia/asia.component';
import { LaosComponent } from './asia/laos/laos.component';
import { JapanComponent } from './asia/japan/japan.component';

import { DataService } from './shared/data.service';

@NgModule({
  declarations: [
    AppComponent,
    EuropeComponent,
    ItalyComponent,
    AfricaComponent,
    GhanaComponent,
    AmericasComponent,
    BrazilComponent,
    AsiaComponent,
    LaosComponent,
    JapanComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
      DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
