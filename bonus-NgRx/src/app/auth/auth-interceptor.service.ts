import { Injectable } from '@angular/core';
import {
HttpInterceptor,
HttpRequest,
HttpHandler,
HttpParams
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService, private store: Store<fromApp.IAppState>) {}

    intercept(req: HttpRequest <any> , next: HttpHandler) {
        // return this.authService.user.pipe( // with service
        return this.store.select('auth').pipe( // with ngrx (select returns an observable)
            take(1),
            map(authState => { // added to retrieve "user"
                return authState.user;
            }),
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                    params: new HttpParams().set('auth', user.token)
                });
                return next.handle(modifiedReq);
            })
        );
    }
}
