import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions'; // any name

// Here we'll define the shoppinglist state so we call this interface in all the places needed
export interface IState { // any name
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

// Here we'll define the entire app state (move out of this file?)
export interface IAppState { // any name
    shoppingList: IState;
}

// inital state doesn't have to be a JS object but most likely it will be
const initialState: IState = {
    ingredients: [ // the same inital state as defined in shopping-list.service.ts
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(
    state: IState = initialState,
    action: ShoppingListActions.SLActionTypes // this way we say it's gonna be on of the types defined in export type SLActionTypes
    ) {
    // state = initialState: default argument (from const above), action is of type: Action; defined on actions file

    // All actions; all this code is synchronous:
    switch (action.type) {

        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state, // spread op, copies all properties from old state and passes to the new one
                // REALLY important; ex: if the state structure changes later we'd need to change code in all actions and places 
                ingredients: [...state.ingredients, action.payload]
            };

        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload] // spread op, so it copies payload array and inserts it in new one
            };

        case ShoppingListActions.UPDATE_INGREDIENT:
            const newIngredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...newIngredient, // copy to keep old date, ex: an ID
                ...action.payload
            }
            const updatedAllIngredients = [...state.ingredients];
            updatedAllIngredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state,
                ingredients: updatedAllIngredients,
                editedIngredient: null, // reset
                editedIngredientIndex: -1 // reset
            };

        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter( (ig, igIndex) => {
                    return igIndex !== state.editedIngredientIndex;
                    // filter to return false if the ig is the one to be deleted, anf therefore, not going to this new array
                }),
                editedIngredient: null, // reset
                editedIngredientIndex: -1 // reset
            };

        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
                // 1 access the right one in array of current state
                // 2 copy to a new object with {...} so we don't mess with the state
            };

        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };

        default:
            return state;
    }
}
