import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipes.reducer';

// import "substates" into a global App State
export interface IAppState {
    shoppingList: fromShoppingList.IState;
    auth: fromAuth.IState;
    recipes: fromRecipes.IState;
}

export const appReducer: ActionReducerMap<IAppState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
    auth: fromAuth.authReducer,
    recipes: fromRecipes.recipeReducer
}
