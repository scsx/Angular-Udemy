import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private authService: AuthService) {}

    ngOnInit() {
        // check is user has localStorage so we keep him logged in
        this.authService.autoLogin();
    }
}