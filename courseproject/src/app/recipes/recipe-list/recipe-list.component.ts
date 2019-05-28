import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html'
})
export class RecipeListComponent implements OnInit {

    recipes: Recipe[]; // starts undefined, was moved to recipe.service

    constructor(private recipeService: RecipeService,
                private router: Router,
                private actRouter: ActivatedRoute) {}

    ngOnInit() {
        this.recipes = this.recipeService.getRecipes();
    }

    onNewRecipe() {

        this.router.navigate(['new'], { relativeTo: this.actRouter }); // relativeTo must be used (and import ActivatedRoute )
        /* this would also work:
        this.router.navigateByUrl('/recipes/new').then(e => {
            if (e) {
                console.log("Navigation is successful!");
            } else {
                console.log("Navigation has failed!");
            }
        });
        */
    }

}
