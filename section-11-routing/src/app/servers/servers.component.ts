import { Component, OnInit } from '@angular/core';
import { ServersService } from './servers.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-servers',
    templateUrl: './servers.component.html'
})
export class ServersComponent implements OnInit {
    private servers: {
        id: number,
        name: string,
        status: string
    } [] = [];

    constructor(
        private serversService: ServersService,
        private routerInstance: Router,
        private routeToHere: ActivatedRoute
    ) {}

    ngOnInit() {
        this.servers = this.serversService.getServers();
    }

    onReload() {
        //this.routerInstance.navigate(['/servers'], { relativeTo: this.routeToHere });
        // this needs 2nd argument because .navigate() doesn't know where it is, i.e. em que componente está e por isso não sabe como construir caminho relativo
    }

}
