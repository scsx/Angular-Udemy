import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface IState {
    user: User;
    authError: string;
    loading: boolean;
}

const initialState = {
    user: null,
    authError: null,
    loading: false
};

export function authReducer(
    state = initialState,
    action: AuthActions.AuthActionTypes
    ) {

    // All actions; all this code is synchronous:
    switch (action.type) {

        case AuthActions.LOGIN:
            const user = new User(
                action.payload.email,
                action.payload.id,
                action.payload.token,
                action.payload.tokenExpirationDate
            );
            return {
                ...state,
                authError: null,
                user: user,
                loading: false
            }

        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };

        case AuthActions.LOGIN_START:
            return {
                ...state,
                authError: null,
                loading: true
            };

        case AuthActions.LOGIN_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload, // string
                loading: false
            };

        default:
            return state;
    }
}
