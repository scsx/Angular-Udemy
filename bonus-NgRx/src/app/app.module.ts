import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

import * as fromApp from './store/app.reducer'; // Entire App State
import { AuthEffects } from './auth/store/auth.effects'; // Entire App Effects

@NgModule({
    declarations: [AppComponent, HeaderComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        CoreModule,
        StoreModule.forRoot(fromApp.appReducer), // Entire App State
        EffectsModule.forRoot([  // Entire App Effects
            AuthEffects
        ])
    ],
    bootstrap: [AppComponent],
    // providers: [LoggingService]
})
export class AppModule {}
