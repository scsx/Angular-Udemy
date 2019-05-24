import  { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { ServerComponent } from './servers/server/server.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from './error-page/error-page.component';

import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ServerResolver } from './servers/server/server-resolver.service';


const appRoutes: Routes = [
    { path: '', component: HomeComponent }, // if this was a redirect, and because '' is allways present, use { path: '', redirectTo: '/somewhere-else', pathMatch: 'full' }
    { path: 'users', component: UsersComponent,
        children: [
            { path: ':idParam/:nameParam', component: UserComponent }, // dynamic path
        ]
    },
    {
        path: 'servers',
        //canActivate: [AuthGuard], // guards itself
        canActivateChild: [AuthGuard], // guards children, not itself
        component: ServersComponent,
        children: [
            { path: ':id', component: ServerComponent, resolve: { serverRes: ServerResolver } },
            { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    },
    //{ path: '404', component: PageNotFoundComponent }, // 404; uncommment to get 404 page again
    { path: '404', component: ErrorPageComponent, data: {message: 'page not found; message from route!'} }, // Passing Static Data to a Route, aula 146
    { path: '**', redirectTo: '/404' } // wildcard, redirects to 404 -> MUST BE LAST or will allways go to not-found
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
        // RouterModule.forRoot(appRoutes, { useHash: true })
        // Use hash (http://ex.pt/#/users). Para browsers antigos e problemas no servidor a resolver caminhos (aula 148)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}