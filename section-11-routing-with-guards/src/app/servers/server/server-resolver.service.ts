import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ServersService } from "../servers.service";

interface IServer {
    id: number,
    name: string,
    status: string
}

@Injectable() // to get ServersService

export class ServerResolver implements Resolve<{IServer}> { // Resolve is a generic type and should wrap<> whatever we get here

    constructor( private serversService: ServersService ) {}

    resolve(
        actRouteSnap: ActivatedRouteSnapshot,
        stateSnap: RouterStateSnapshot ): Observable<IServer> | Promise<IServer> | IServer {

            return this.serversService.getServer( +actRouteSnap.params['id']); //+ convert to num

    }
}