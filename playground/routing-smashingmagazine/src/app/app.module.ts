import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http'; 

import { BackendService } from './backend.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ArtistComponent } from './artist/artist.component';


@NgModule({
    declarations: [
        AppComponent,
        ContactListComponent,
        ContactDetailComponent,
        ArtistComponent
    ],
    imports: [
        BrowserModule,
        InMemoryWebApiModule.forRoot(BackendService),
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
