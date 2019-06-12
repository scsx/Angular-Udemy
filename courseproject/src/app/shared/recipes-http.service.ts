import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipes.model';
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

    // method is called on header, we get here and return, the subscription is made on header
    fetchRecipes() {
        return this.http
        .get<Recipe[]>('https://angular-udemy-courseproject.firebaseio.com/recipes.json')
        // without pipe a recipe could be stored without ingredients
        .pipe(map(recs => {
            return recs.map( rec => { // map here is the ES6 method
                // take all properties ...rec, and ingredients will be checked for truthy and remain equal, otherwise will be set to empty array
                return { ...rec, ingredients: rec.ingredients ? rec.ingredients : [] }
            });
        }),
        tap( recs => {
            this.recipesService.setRecipes(recs);
        }))
    }

}