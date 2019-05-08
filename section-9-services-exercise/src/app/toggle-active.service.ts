import { Injectable, EventEmitter } from '@angular/core';

import { CountService } from './count.service';

@Injectable()

export class ToggleActiveService {

    activeUsers = ['Max', 'Anna', 'Ray', 'Josephina'];
    inactiveUsers = ['Chris', 'Manu', 'Victoria', 'Paul'];

    activeCount = new EventEmitter<number>();
    inactiveCount = new EventEmitter<number>();
    
    constructor( private countService: CountService) {}

    toggleActiveness() {
        console.log("service works");
    }

    setToActive(id: number) {
        this.activeUsers.push(this.inactiveUsers[id]);
        this.inactiveUsers.splice(id, 1);

        this.countService.logStatusChange(2, 1);
    }

    setToInactive(id: number) {
        this.inactiveUsers.push(this.activeUsers[id]);
        this.activeUsers.splice(id, 1);
    }

}
