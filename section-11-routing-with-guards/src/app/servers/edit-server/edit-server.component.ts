import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-edit-server',
    templateUrl: './edit-server.component.html'
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
    server: {
        id: number,
        name: string,
        status: string
    };
    serverName = '';
    serverStatus = '';
    // 
    allowEdit = false;
    changesSaved = false; // check if changes were made (canDeactivate)

    constructor(private serversService: ServersService,
                private route: ActivatedRoute, // ActivatedRoute to get query params (?allow) and fragment (#something)
                private routerToEnableNav: Router) {} 

    ngOnInit() {
        console.log(this.route.snapshot.queryParams);  // this works on start but doesnt update
        console.log(this.route.snapshot.fragment);     // this works on start but doesnt update
        this.route.queryParams.subscribe(              // this will update
            (queryParams: Params) => {
                this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
                console.log( queryParams['allowEdit'] );
            }
        ); 
        this.route.fragment.subscribe(); // this will update
        const id = +this.route.snapshot.params['id'];
        this.server = this.serversService.getServer(id);
        // subscribe route params to update the id if params change (NOT IMPLEMENTED IN LECTURE)
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
    }

    onUpdateServer() {
        this.serversService.updateServer(this.server.id, {
            name: this.serverName,
            status: this.serverStatus
        });

        this.changesSaved = true;
        this.routerToEnableNav.navigate(['../'], { relativeTo: this.route});
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.allowEdit) {
            return true;
        }
        if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status)) { // check for changes on inputs
            return confirm('Do you want to discard changes?'); // popup
        } else {
            return true;
        }
    }

}
