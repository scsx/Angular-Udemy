import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

export interface IAuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered ? : boolean;
}

// helper function to run on success for both login/signup;
// code is different here to keep ngrs flow cleaner; problems fix following https://www.udemy.com/the-complete-guide-to-angular-2/learn/lecture/14466608
const handleAuthenticaton = (resData: any) => {
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User( resData.email, resData.localId, resData.idToken, expirationDate );
    localStorage.setItem('userData', JSON.stringify(user));

    return new AuthActions.AuthenticateSuccess({
        email: resData.email,
        id: resData.localId,
        token: resData.idToken,
        tokenExpirationDate: expirationDate,
        redirect: true
    })
}

// helper function to run on error for both login/signup
const handleError = (errorRes: any) => {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
        // create a new observable without errors; MUST be done so that the general flow doesnt die
        return of(new AuthActions.AuthenticateFail(errorMessage));
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
    return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable() // needed so things get injected into this class AuthEffects 

export class AuthEffects {

    // ### EFFECT; doesnt need subscribe, ngrx does that; Sign up
    @Effect() // This effect dispatches action, leave the decorator empty; see below for comparison
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupStart: AuthActions.SignupStart) => {
            return this.http
            .post < IAuthResponseData > (
                'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseAPIKey, {
                    email: signupStart.payload.email,
                    password: signupStart.payload.password,
                    returnSecureToken: true
                }
            ).pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000); // set timer for token
                }),
                map(resData => { // create a new observable without errors; MUST be done so that the general flow doesnt die
                    return handleAuthenticaton(resData);
                    // return because the function returns an observable
                }),
                catchError(errorRes => {
                    return handleError(errorRes);
                    // return because the function returns an observable
                })
            )
        })
    );

    // ### EFFECT; Login
    @Effect() // This effect dispatches action, leave the decorator empty; see below for comparison
    authLogin = this.actions$.pipe(
        // only continue this observable if the action is "of Type" LOGIN_START
        ofType(AuthActions.LOGIN_START),
        // creates another observable with the current observable's data
        switchMap((authData: AuthActions.LoginStart) => {
            
            return this.http.post <IAuthResponseData> (
                    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey, {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken: true
                    }
                )
                // errors must be checked here, with pipe(). https://www.udemy.com/the-complete-guide-to-angular-2/learn/lecture/14466596
                .pipe(
                    tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000); // set timer for token
                }),
                map(resData => { // create a new observable without errors; MUST be done so that the general flow doesnt die
                    return handleAuthenticaton(resData);
                    // return because the function returns an observable
                }),
                catchError(errorRes => {
                    return handleError(errorRes);
                    // return because the function returns an observable
                })
            )
        })
    );

    // ### EFFECT
    // Redirect after login/logout
    @Effect({ dispatch: false }) // This effect doesnt dispatch actions, so signal that here
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS, AuthActions.LOGOUT), // 2 actions!
        tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
            if (authSuccessAction.payload.redirect) { // https://www.udemy.com/the-complete-guide-to-angular-2/learn/lecture/14466632
                this.router.navigate(['/']);
            }
        })
    );

    // ### EFFECT
    // Logout
    @Effect({ dispatch: false }) // This effect doesnt dispatch actions, so signal that here
    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT), // 2 actions!
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    );

    // ### EFFECT
    // Auto Login
    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        // map so it returns somth
        map(() => {
            const userData: { // this is type assertion
                email: string;
                id: string;
                _token: string;
                _tokenExpirationDate: string;
            } = JSON.parse(localStorage.getItem('userData'));

            if (!userData) {
                return { type: 'DUMMY' };
            }

            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            );

            if (loadedUser.token) {
                // set timer for token
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer( expirationDuration );

                return new AuthActions.AuthenticateSuccess({
                    email: loadedUser.email,
                    id: loadedUser.id,
                    token: loadedUser.token,
                    tokenExpirationDate: new Date(userData._tokenExpirationDate),
                    redirect: false
                });
            }

            return { type: 'DUMMY' }
        })
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService : AuthService
    ) {}
}