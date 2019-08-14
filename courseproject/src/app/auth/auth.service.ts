import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './user.model';
import { environment } from '../../environments/environment' // just 'environment', angular will swap between dev and prod

// Interface created to accomodate the response of http.post http.post<IAuthResponse> for BOTH sign up AND sign in; fields are seen here:
// https://firebase.google.com/docs/reference/rest/auth#section-create-email-password  (Response Payload) or
// https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password  (Response Payload)
export interface IAuthResponse { // is exported because it will be imported and used on auth.cpt.ts
    kind:           string;
    idToken:        string;
    email:          string;
    refreshToken:   string;
    expiresIn:      string;
    localId:        string;
    registered?:    boolean; // this one is only used in sign in so it's optional: registered?
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    // User from user.model.ts; this Subject will reflect all changes: new, expired, etc:
    user = new BehaviorSubject<User>(null); // it used to be Subject; changed to manage the token // null, no user (see logout())
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    // ###-1- SIGN UP
    // REF: https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
    signup(email: string, password: string) {
        return this.http.post<IAuthResponse>( // return here; subscribe on ======???=====
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + environment.firebaseAPIKey,
            {
                email: email, // key names must be exactly like this, ver na REF em "Request Body Payload"
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap( resData => {  // tap performs an operation for every emission on the source Observable but doesn't change it
                // create user with the function declared below:
                this.handleUsers(resData.email, resData.localId, resData.idToken, +resData.expiresIn); // + to convert to number
            })
        )
    }


    // ###-2- LOGIN
    // REF: https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password
    login(email: string, password: string){
        return this.http.post<IAuthResponse>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + environment.firebaseAPIKey,
            {
                email: email, // key names must be exactly like this, ver na REF em "Request Body Payload"
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap( resData => {  // same as the tap above
                this.handleUsers(resData.email, resData.localId, resData.idToken, +resData.expiresIn); // + to convert to number
            })
        )
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if(loadedUser.token) {
            this.user.next(loadedUser); // emit this user
            // calculate expiration date and expire if needed
            const expirationDate = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDate);
        }
    }

    // ###-3- LOGOUT
    logout() {
        this.user.next(null); // pass user as null, it's original state
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        // clear timer if user logs out on is own
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDate: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDate); // set to 2000 to test manually
    }


    // ###-4- USERS
    // method that will handle users from both sign in and sign up; private because it's only used on this service
    private handleUsers(mail: string, id: string, token: string, expDate: number) {
        const expires = new Date(new Date().getTime() + expDate * 1000); // expiresIn in firebase docs comes in seconds, so we multiply by 1000, so it can be compared to now [ new Date().getTime() ]
        const currentUser = new User( mail, id, token, expires );
        this.user.next(currentUser); // next from user subject, with the new user as arg
        this.autoLogout(expDate * 1000); // set timer for user expiration
        localStorage.setItem('userData', JSON.stringify(currentUser)); // set localStorage for user
    }



    // ###-5- ERRORS
    // method that will handle errors from both sign in and sign up; private because it's only used on this service
    private handleError(errorRes) {
        let errorMessage = 'Unknown error!';
        if (!errorRes.error || !errorRes.error.error) {
            // this condition can be network error; returns an observable with the error message
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'Email already exists!';
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email is not registered!';
            case 'INVALID_PASSWORD':
                errorMessage = 'Password not ok!';
        }
        // returns an observable with the error message; see more comments on auth.cpt.ts
        return throwError(errorMessage);
    }

}
