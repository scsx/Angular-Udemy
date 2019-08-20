import { Action } from '@ngrx/store'; // Action is a Interface
import { Ingredient } from '../../shared/ingredient.model';

// this prevents typos by keeping here the value of the consts
export const ADD_INGREDIENT = '[Shopping List] Add ingredient';
export const ADD_INGREDIENTS = '[Shopping List]  Add ingredients, plural';
export const UPDATE_INGREDIENT = '[Shopping List]  Update ingredient';
export const DELETE_INGREDIENT = '[Shopping List]  Delete ingredient';

export const START_EDIT = '[Shopping List] Start editing';
export const STOP_EDIT = '[Shopping List] Stop editing';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT; // readonly so it's never changed from outside
    //payload: Ingredient; // payload is optional; moved to constructor so it's passed as arg:
    constructor (public payload: Ingredient) {} // single ing
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    constructor (public payload: Ingredient[]) {} // multiple ings
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;
    constructor (public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
    readonly type = START_EDIT;
    constructor (public payload: number) {} // what ing
}

export class StopEdit implements Action {
    readonly type = STOP_EDIT; // doesnt need payload
}

// create our own type
export type SLActionTypes =
| AddIngredient
| AddIngredients
| UpdateIngredient
| DeleteIngredient
| StartEdit
| StopEdit;