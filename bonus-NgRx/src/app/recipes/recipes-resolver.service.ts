import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { take, map, switchMap } from 'rxjs/operators';

import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipes.actions';

import { Actions, ofType } from '@ngrx/effects'; // trick: https://www.udemy.com/the-complete-guide-to-angular-2/learn/lecture/14466630
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class RecipesResolverService implements Resolve <Recipe[]> {

    constructor(
        private store: Store<fromApp.IAppState>,
        private actions$: Actions
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.store.select('recipes').pipe(
            take(1),
            map(recipesState => {
                return recipesState.recipes;
            }),
            switchMap(recipes => {
                if (recipes.length === 0) {
                    this.store.dispatch(new RecipesActions.FetchRecipes());
                    // trick: https://www.udemy.com/the-complete-guide-to-angular-2/learn/lecture/14466630 :
                    return this.actions$.pipe(
                        ofType(RecipesActions.SET_RECIPES),
                        take(1)
                    )
                } else {
                    return of(recipes);
                }
            })
        )

        
        
        
    }
}
