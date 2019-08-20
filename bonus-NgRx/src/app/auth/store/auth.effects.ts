import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import * as AuthActions from './auth.actions';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface IAuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered ? : boolean;
}

@Injectable() // needed so things get injected into this class AuthEffects 

export class AuthEffects {

    // EFFECT; doesnt need subscribe, ngrx does that;
    // Login effect
    @Effect() // This effect dispatches action, leave the decorator empty; see below for comparison
    authLogin = this.actions$.pipe(
        // only continue this observable if the action is "of Type" LOGIN_START
        ofType(AuthActions.LOGIN_START),
        // creates another observable with the current observable's data
        switchMap((authData: AuthActions.LoginStart) => {
            console.log(environment.firebaseAPIKey);
            return this.http.post < IAuthResponseData > (
                    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey, {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }
                )
                // errors must be checked here, with pipe(). https://www.udemy.com/the-complete-guide-to-angular-2/learn/lecture/14466596
                .pipe(
                    map(resData => {
                        // create a new observable without errors; MUST be done so that the general flow doesnt die
                        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                        return new AuthActions.Login({
                            email: resData.email,
                            id: resData.localId,
                            token: resData.idToken,
                            tokenExpirationDate: expirationDate
                        })
                    }),
                    catchError(errorRes => {
                        let errorMessage = 'An unknown error occurred!';
                        if (!errorRes.error || !errorRes.error.error) {
                            // create a new observable without errors; MUST be done so that the general flow doesnt die
                            return of(new AuthActions.LoginFail(errorMessage));
                        }
                        switch (errorRes.error.error.message) {
                            case 'EMAIL_EXISTS':
                                errorMessage = 'This email exists already';
                                break;
                            case 'EMAIL_NOT_FOUND':
                                errorMessage = 'This email does not exist.';
                                break;
                            case 'INVALID_PASSWORD':
                                errorMessage = 'This password is not correct.';
                                break;
                        }
                        return of(new AuthActions.LoginFail(errorMessage));
                    })
                )
        })
    );

    // EFFECT;
    // Redirect after login effect
    @Effect({
        dispatch: false
    }) // This effect doesnt dispatch actions, so signal that here
    authSuccess = this.actions$.pipe(
        ofType(AuthActions.LOGIN),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}
