import { Component } from '@angular/core';
import { ToggleActiveService } from './toggle-active.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ToggleActiveService]
})
export class AppComponent {

    constructor(private toggleActiveServiceArgument: ToggleActiveService) {

    }

    activeUsers = this.toggleActiveServiceArgument.activeUsers;
    inactiveUsers = this.toggleActiveServiceArgument.inactiveUsers;

    /* onSetToInactive(id: number) {
        console.log("onSetToInactive works");
    }

    onSetToActive(id: number) {
        console.log("onSetToActive works");
    } */
}
