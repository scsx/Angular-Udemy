import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";


@Injectable() // to get service

export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthService, private routerToEnableNav: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

            return this.authService.isAuthenticated()
                .then(
                    (authenticated: boolean) => {
                        if (authenticated) {
                            console.log("authenticated");
                            return true; // 1) has auth
                        } else {
                            console.log("not authenticated");
                            this.routerToEnableNav.navigate(['/']); // 2) go away
                        }
                    }
                );
    }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this.canActivate(route, state);  

    }

}