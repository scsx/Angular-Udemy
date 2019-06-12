// service will be added to recipe.component -> providers: [RecipeService] to be available only there and it's children
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService {

    // created so that the ingredients can be updated with new/edited recipes from form; we've been using a copy of ingredients (.slice())
    // changes will be seen at recipe-list.cpt, where list is displayed
    recipesChanged = new Subject<Recipe[]>();
    
    // recipes: Recipe[] inform Typescript that recipes is an array of objects of type Recipe
    /* commented while passing to server
    private recipes: Recipe[] = [
        new Recipe(
            'Frango na Púcara', 'Típico de Alcobaça', 'https://www.saborintenso.com/images/receitas/Frango-na-Pucara-SI-1.jpg',
            [
                new Ingredient('Frango', 1), new Ingredient('Azeite', 150), new Ingredient('Batatas', 15)
            ]), ...
    ]; */

   private recipes: Recipe[] = [];

    constructor(private slService: ShoppingListService) {}

    // get recipes from server and overwrite locally
    setRecipes(recipesArg: Recipe[]) {
        this.recipes = recipesArg;
        this.recipesChanged.next(this.recipes.slice()); // emit changes, like bellow
    }

    getRecipes() {
        return this.recipes.slice(); // .slice() is not to mess the original array; creates a copy instead
    }
    
    // for recipe-detail.cpt get through routing
    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    // new methods to save recipes from the form
    addRecipe(newrec: Recipe) {
        this.recipes.push(newrec);
        this.recipesChanged.next(this.recipes.slice()); // emit changes
    }

    updateRecipe(index: number, newrec: Recipe) {
        this.recipes[index] = newrec;
        this.recipesChanged.next(this.recipes.slice()); // emit changes
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice()); // emit changes
    }
}