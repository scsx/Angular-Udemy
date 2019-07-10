// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// cpts
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AlertComponent } from './shared/alert/alert.component';

// directives and services (moved to CoreModule)

// modules (not lazy loaded)
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';

@NgModule({
    declarations: [ // cpts, directives and custom pipes go here
        // several cpts were moved to their respective modules
        AppComponent,
        HeaderComponent
        /* These now are declared on SharedModule:
        DropdownDirective, LoadingSpinnerComponent, AlertComponent, PlaceholderDirective */
    ],
    imports: [ // other modules go here, from @angular or custom
        BrowserModule,
        HttpClientModule,
        // these doesnt come from @angular, unlike the other imports:
        AppRoutingModule,
        // RecipesModule, ShoppingListModule, AuthModule, // feature modules; removed because they're lazy loaded
        SharedModule, // shared module; !! in theory it should NOT be imported here, but instead, in modules that need it only
        CoreModule // core module, base functionality that keeps AppModule leaner
    ],
    providers: [
        // services need to come here or use { providedIn: 'root' } at the service's @Injectable()
    ],
    bootstrap: [AppComponent], // cpts available at the start, typically just one
    entryComponents: [ // for dynamically created components
        AlertComponent
    ]
})

export class AppModule {}