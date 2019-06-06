import { Component, OnInit /*, Input */} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

    //@Input() recipe: Recipe;

    recipe: Recipe;
    recipeId: number;

    constructor(
        private repService: RecipeService,
        private actRoute: ActivatedRoute,
        private router: Router
        ) {}

    ngOnInit() {
        this.actRoute.params.subscribe( // subscribe so it updates instead of loading just once
            (params: Params) => {
                this.recipeId = +params['id']; // unary + because it comes as string
                this.recipe = this.repService.getRecipe(this.recipeId);
            }
        )
    }

    onAddToShoppingList() {
        this.repService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

    onEditRecipe() {
        // SIMPLE WAY (we're already on recipe detail (/id))
        this.router.navigate(['edit'], { relativeTo: this.actRoute });

        // VERBOSE, using the recipeId from above and building all path (recipes/0/edit)
        // this.router.navigate(['../', this.recipeId, 'edit'], { relativeTo: this.actRoute });
    }

    onDeleteRecipe() {
        this.repService.deleteRecipe(this.recipeId);
        // navigate so we don't stay in the recipe detail after deleting it
        this.router.navigate(['/recipes']);
    }

}
