import { Action } from '@ngrx/store'; // Action is a Interface

// this prevents typos by keeping here the value of the consts
export const LOGIN_START = '[Auth] Login start, for effects';
export const AUTO_LOGIN = '[Auth] Auto login, from webstorage';
export const AUTHENTICATE_SUCCESS = '[Auth] Login';
export const AUTHENTICATE_FAIL = '[Auth] Login fail';
export const SIGNUP_START = '[Auth] Signup start'; // errors will be handled by login code
export const CLEAR_ERROR = '[Auth] Handle errors on state only (SSOT)';
export const LOGOUT = '[Auth] Logout';

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;
    constructor (
        public payload: {
            email: string,
            id: string,
            token: string,
            tokenExpirationDate: Date,
            redirect: boolean
        }) {}
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor(public payload: { email: string, password: string}) {}
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;
    constructor(public payload: string) {} // payload will be the error msg
}

export class SignupStart implements Action {
    readonly type = SIGNUP_START;
    constructor(public payload: { email: string, password: string}) {}
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

// create our own types; this should be only needed for reducers (ex: not effects)
export type AuthActionTypes = AuthenticateSuccess | Logout | LoginStart | AuthenticateFail | SignupStart | ClearError | AutoLogin;