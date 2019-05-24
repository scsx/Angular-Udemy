import { Component } from '@angular/core';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html'
})
export class UsersComponent {
    users = [{
            id: 124,
            name: 'Claudius'
        },
        {
            id: 248,
            name: 'Magnus'
        },
        {
            id: 3918,
            name: 'Romulus'
        }
    ];
}
