import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html'
})
export class ServerComponent implements OnInit {
    server: {
        id: number,
        name: string,
        status: string
    };

    constructor(private serversService: ServersService,
                private actRoute: ActivatedRoute,
                private routerToGetParams: Router) {}

    ngOnInit() {
        const id = +this.actRoute.snapshot.params['id'];   // +unary -> COMES AS STRING, CONVERT TO NUM
        this.server = this.serversService.getServer(id); // 1. get initial value
        this.actRoute.params.subscribe(                    // 2. subscribe for subsequent values
            (params: Params) => {
                this.server = this.serversService.getServer( +params['id']); // +unary -> COMES AS STRING, CONVERT TO NUM
            }
        );

    }

    onEdit() {
        this.routerToGetParams.navigate(['edit'], { relativeTo: this.actRoute, queryParamsHandling: 'preserve' });
        // (1) Get params and instad of writing entire path:
        // (2) say relative to what (relativeTo)
        // (3) queryParamsHandling -> keep params in URL (edit?allowEdit=0)
    }

    onTest() {
        console.log(this.routerToGetParams );
    }

}
