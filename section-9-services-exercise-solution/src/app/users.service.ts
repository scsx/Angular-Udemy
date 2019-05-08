import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable()

export class UserService {

    activeUsers = ['Max', 'Anna'];
    inactiveUsers = ['Chris', 'Manu'];

    constructor(private counterService: CounterService) {}

    SetToActive(id: number) {
        this.activeUsers.push(this.inactiveUsers[id]);
        this.inactiveUsers.splice(id, 1);
        // injected service
        this.counterService.incrementInactiveToActive();
    }

    SetToInactive(id: number) {
        this.inactiveUsers.push(this.activeUsers[id]);
        this.activeUsers.splice(id, 1);
        // injected service
        this.counterService.incrementActiveToInactive();
    } 

}
