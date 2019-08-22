import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as RecipesActions from './recipes.actions';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipesEffects {

    constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.IAppState>) {}

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
             return this.http.get<Recipe[]> (
                'https://angular-udemy-courseproject.firebaseio.com/recipes.json'
            )
        }),
        map(recipesFromServer => {
            return recipesFromServer.map(recipe => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });
        }),
        map(recipes => {
            return new RecipesActions.SetRecipes(recipes);
        })
    );

    @Effect({dispatch: false}) // this effect will dispatch nothing
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(
            this.store.select('recipes')
        ),
        switchMap(([actionData, recipesState])=> {
            return this.http.put(
                'https://angular-udemy-courseproject.firebaseio.com/recipes.json',
                recipesState.recipes
            )
        })
    );

    
}