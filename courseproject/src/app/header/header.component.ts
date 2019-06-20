import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipesHttpService } from '../shared/recipes-http.service';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuthenticated = false;
    private userSub: Subscription;

    constructor( private recHttpService: RecipesHttpService, private authService: AuthService) {}

    ngOnInit() {
        this.userSub = this.authService.user.subscribe( user => {
            // is user than is authenticated
            //this.isAuthenticated = !user ? false : true;
            this.isAuthenticated = !!user; // this line is the same as the one above
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    onSaveData() {
        this.recHttpService.storeRecipes();
    }

    onFetchData() {
        this.recHttpService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

}
