import { Action } from '@ngrx/store'; // Action is a Interface

// this prevents typos by keeping here the value of the consts
export const LOGIN_START = '[Auth] Login start, for effects';
export const LOGIN = '[Auth] Login';
export const LOGIN_FAIL = '[Auth] Login fail';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
    readonly type = LOGIN;
    constructor (
        public payload: {
            email: string,
            id: string,
            token: string,
            tokenExpirationDate: Date
        }) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email: string, password: string}) {}
}

export class LoginFail implements Action {
    readonly type = LOGIN_FAIL;
    constructor(public payload: string) {} // payload will be the error msg
}

// create our own types
export type AuthActionTypes = Login | Logout | LoginStart | LoginFail;