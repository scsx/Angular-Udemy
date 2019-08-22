import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

import * as fromApp from './store/app.reducer'; // Entire App State
import { AuthEffects } from './auth/store/auth.effects'; // Entire App Effects
import { RecipesEffects } from './recipes/store/recipes.effects';

@NgModule({
    declarations: [AppComponent, HeaderComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        CoreModule,
        StoreModule.forRoot(fromApp.appReducer), // Entire App State
        EffectsModule.forRoot([AuthEffects, RecipesEffects]), // Entire App Effects
        StoreDevtoolsModule.instrument({ logOnly: environment.production }), // Dev tools; production to log in production only (?)
        StoreRouterConnectingModule.forRoot() // not used; check Dev tools in chrome to see extra info about ngrx and routing
    ],
    bootstrap: [AppComponent],
    // providers: [LoggingService]
})
export class AppModule {}