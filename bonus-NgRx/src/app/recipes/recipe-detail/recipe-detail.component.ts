import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipesActions from '../store/recipes.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
    recipe: Recipe;
    id: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<fromApp.IAppState>) {}

    ngOnInit() {
        // OPTION 1: Obs inside Obs
        /*
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.id = +params['id'];
                    this.store.select('recipes').pipe(map(recipesState => {
                        return recipesState.recipes.find((recipe, index) => {
                            return index === this.id;
                        })
                        // assim seria mais curto: return recipesState.recipes[+params['id']]
                    }))
                    .subscribe(recipe => {
                        this.recipe = recipe;
                    })
                }
            );
        */
        // OPTION 2: One big Obs
        this.route.params
            .pipe(
                // get id and transform to number
                map(params => {
                    return +params['id'];
                }),
                // switch obs from the route to store; update this.id
                switchMap( id => {
                    this.id = id;
                    return this.store.select('recipes');
                }),
                // choose the recipe with this.is
                map(recipesState => {
                    return recipesState.recipes.find((recipe, index) => {
                        return index === this.id;
                    }) 
                }),
            )
            .subscribe(recipe => {
                this.recipe = recipe;
            })
    }

    onAddToShoppingList() {
        this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
    }

    onEditRecipe() {
        this.router.navigate(['edit'], {
            relativeTo: this.route
        });
    }

    onDeleteRecipe() {
        this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
        this.router.navigate(['/recipes']);
    }

}
