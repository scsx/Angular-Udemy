/* this resolver came to fix a problem: 
on recipe detail reloading the page would result:
ERROR TypeError: Cannot read property 'ingredients' of undefined
because without fetching the recipes first, /recipes/1 doesn't exist, or it's properties
*/
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipes.model';
import { RecipesHttpService } from '../shared/recipes-http.service';
import { RecipeService } from './recipe.service';

@Injectable({providedIn: 'root'})

export class RecipesResolverService implements Resolve<Recipe[]> {

    constructor(private recHttp: RecipesHttpService, private recService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recService.getRecipes();
        if ( recipes.length === 0 ) {
            return this.recHttp.fetchRecipes();
        } else {
            return recipes;
        }
    }
}