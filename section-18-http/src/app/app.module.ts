import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthIntersectorService } from './auth-intersector.service';
import { LoggingIntersectorService } from './logging-intersector.service';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, HttpClientModule],
    providers: [ { // interesectors
        provide: HTTP_INTERCEPTORS, // "token"
        useClass: AuthIntersectorService, // "our intersector"
        multi: true  // if we have more than one intersector
    },
    { // another intersector: !! THE ORDER MATHERS !!
        provide: HTTP_INTERCEPTORS,
        useClass: LoggingIntersectorService,
        multi: true
    } ],
    bootstrap: [AppComponent]
})
export class AppModule {}
