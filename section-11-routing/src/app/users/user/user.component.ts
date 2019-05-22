import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

    user: {
        id: number,
        name: string
    };

    constructor(private routeToHere: ActivatedRoute) {} // ActivatedRoute will give us access to the parameter passed in URL, in this case, the user

    ngOnInit() {
        this.user = {
            id: this.routeToHere.snapshot.params['idParam'],
            name: this.routeToHere.snapshot.params['nameParam']
        }
        this.routeToHere.params.subscribe(
            (newParams: Params) => {
                this.user.id = newParams['idParam'];
                this.user.name = newParams['nameParam'];
            }
        ); // subscribe to receive the updated data; in the case: when we are already at the user page but want a new user; by default angular would change the url but keep the same user name and id;
        // use when the component can be refreshed from within
        // class 130 says how to unsubscribe() OnDestroy but angular does that already
    }

}
