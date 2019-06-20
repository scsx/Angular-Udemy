import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';

// This Interceptor will add the token to ALL outgoing requests

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        actRoute: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot
        ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        // this already returns an observable but it's not boolean, so we use map
        return this.authService.user.pipe(
            take(1), // to avoid problems with subscriptions, consider only 1 user
            map( user => {
                const isAuth = !!user;  // the same as: return !user ? false : true;
                if (isAuth) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
        }))
        
        /* The same result (redirect to /auth if not logged in) without using UrlTree (should also be removed the expected ... | UrlTree)
        return this.authService.user.pipe(
            map( user => {
                return !!user;
        }),
        tap( isAuth => { // tap will receive the true/false from the map above and use it as isAuth
            if (!isAuth) {
                this.router.navigate(['/auth']);
            }
        }))
        */
        
    }

}
