import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

// This Interceptor will add the token to ALL outgoing requests

@Injectable() // no provided in root, check app.module
export class AuthInterceptorService implements HttpInterceptor {

    constructor( private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            // 1 We use user observable and unsub (take gets 1 user and then unsubscribes)
            take(1), // get user
            // 2 With exhaustMap we subscribe to another observable recipes
            exhaustMap(thisuser => {
                // if we dont have a new user now don't send token
                if( !thisuser) {
                     return next.handle(req);
                }
                const modifiedReq = req.clone({params: new HttpParams().set('auth', thisuser.token)}); // as needed by firebase
                return next.handle(modifiedReq);
            })
        );
    }

}
