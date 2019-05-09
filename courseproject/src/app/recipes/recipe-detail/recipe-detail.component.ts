import {
    Component,
    OnInit,
    Input
} from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

    @Input() recipe: Recipe;

    constructor(private repService: RecipeService) {}

    ngOnInit() {}

    onAddToShoppingList() {
        this.repService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

}
