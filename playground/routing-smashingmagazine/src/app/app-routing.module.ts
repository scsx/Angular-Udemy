import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ArtistComponent } from './artist/artist.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'contacts'},
    {path: 'contacts' , component: ContactListComponent},
    {path: 'contact/:id' , component: ContactDetailComponent}

    //{path: ':name/@blacklips.com' , component: ArtistComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
