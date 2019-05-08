import { Component, } from '@angular/core';
import { ToggleActiveService } from '../toggle-active.service';

@Component({
    selector: 'app-inactive-users',
    templateUrl: './inactive-users.component.html',
    styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {

    constructor(private toggleActiveService: ToggleActiveService) {}

    users = this.toggleActiveService.inactiveUsers;


    onSetToActive(id: number) {
        this.toggleActiveService.setToActive(id);
    }

    ngOnInit() {
        //console.log( this.toggleActiveService.toggleActiveness() );
    }
}
