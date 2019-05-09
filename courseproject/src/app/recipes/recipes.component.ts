import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes.model';
import { RecipeService } from './recipe.service';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss'],
    providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

    selectedRecipe: Recipe;

    constructor(private recipeService: RecipeService) {}

    ngOnInit() {
        this.recipeService.recipeSelectedEmitter
            .subscribe(
                (recipeArg: Recipe) => {
                    this.selectedRecipe = recipeArg;
                }
            );
    }

}
