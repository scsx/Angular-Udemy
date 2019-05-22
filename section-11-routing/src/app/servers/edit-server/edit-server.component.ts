import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-edit-server',
    templateUrl: './edit-server.component.html'
})
export class EditServerComponent implements OnInit {
    server: {
        id: number,
        name: string,
        status: string
    };
    serverName = '';
    serverStatus = '';
    // 
    allowEdit = false;

    constructor(private serversService: ServersService,
                private route: ActivatedRoute) {} // ActivatedRoute to get query params (?) and fragment (#something)

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

        this.server = this.serversService.getServer(1);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
    }

    onUpdateServer() {
        this.serversService.updateServer(this.server.id, {
            name: this.serverName,
            status: this.serverStatus
        });
    }

}
