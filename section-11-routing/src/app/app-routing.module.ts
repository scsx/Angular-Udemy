import  { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent }, // if this was a redirect, and because '' will allways be present, use { path: '', redirectTo: '/somewhere-else', pathMatch: 'full' }
    { path: 'users', component: UsersComponent,
        children: [
            { path: ':idParam/:nameParam', component: UserComponent }, // dynamic path
        ]
    },
    { path: 'servers', component: ServersComponent,
        children: [
            { path: ':id', component: ServerComponent },
            { path: ':id/edit', component: EditServerComponent }
        ]
    },
    { path: '404', component: PageNotFoundComponent }, // 404
    { path: '**', redirectTo: '/404' } // wildcard, redirects to 404 -> MUST BE LAST or will allways go to not-found
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}