import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    userActivated: boolean = false;
    userActivatedFromSubject: boolean = false;

    // store subject subscription in var so it can be unsubscribed
    private activatedSub: Subscription;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.activatedEmitter.subscribe(didActivate => {
            this.userActivated = didActivate; // comes boolean
        });

        this.activatedSub = this.userService.activatedSubject.subscribe(didActivateFromSubject => {
            this.userActivatedFromSubject = didActivateFromSubject; // comes boolean
        });
    }

    ngOnDestroy(): void {
        this.activatedSub.unsubscribe();
    }
}
