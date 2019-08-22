import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipes.actions';

export interface IState {
    recipes: Recipe[];
}

const initialState: IState = {
    recipes: []
};

export function recipeReducer(
    state = initialState,
    action: RecipesActions.RecipesActionTypes
) {

    // All actions; all this code is synchronous:
    switch (action.type) {

        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload] // get recipes from payload and assign to recipes
            };

        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };

        case RecipesActions.UPDATE_RECIPE:
            /*
            1) find the recipe to update
            2) copy it
            3) change it
            4) copy all recipes
            5) there, replace the recipe
            6) send to steate the changed recipe list
            */
            const updatedRecipe = {
                    ...state.recipes[action.payload.index],             // 1) 2)
                    ...action.payload.newRecipe                         // 3)
                };
            const updatedRecipeList = [...state.recipes];               // 4)
            updatedRecipeList[action.payload.index] = updatedRecipe;    // 5)

            return {
                ...state,
                recipes: updatedRecipeList                              // 6)
            };

        case RecipesActions.DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter((recipe, index) => {
                    return index !== action.payload;
                })
            };

        default:
            return state;
    }
}
