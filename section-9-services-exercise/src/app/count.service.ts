import { Injectable } from "@angular/core";

@Injectable()

export class CountService {

    logStatusChange(activeCount: number, inactiveCount: number){
        console.log('Actives are now ' + activeCount);
        console.log('Inactives are now ' + inactiveCount);
    }

}
