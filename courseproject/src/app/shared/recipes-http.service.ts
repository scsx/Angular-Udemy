import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ // we're going to inject a service on this one
    providedIn: 'root'
}) 

export class RecipesHttpService {

    constructor( private http: HttpClient, private recipesService: RecipeService ) {}

    // could have an arg (recs: Recipes[]) but we'll inject recipes service instead
    storeRecipes() {
        
        const recipes = this.recipesService.getRecipes();
        // instead of post, put to override existing recipes
        this.http.put(
            'https://angular-udemy-courseproject.firebaseio.com/recipes.json',
            recipes
        ).subscribe( response => {
            console.log(response);
        });
    }

}