import { Component, OnInit } from '@angular/core';
import { ToggleActiveService } from '../toggle-active.service';

@Component({
    selector: 'app-active-users',
    templateUrl: './active-users.component.html',
    styleUrls: ['./active-users.component.css']
    //, providers: [ToggleActiveService]
})
export class ActiveUsersComponent implements OnInit {

    constructor(private toggleActiveService: ToggleActiveService) {}

    users = this.toggleActiveService.activeUsers;

    onSetToInactive(id: number) {
        this.toggleActiveService.setToInactive(id);
    }

    ngOnInit() {
        //console.log( this.toggleActiveService.toggleActiveness() );
    }

}
