import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

    @Output() recipeWasSelected = new EventEmitter<Recipe>();

    recipes: Recipe[] = [ // recipes: Recipe[] inform Typescript that recipes is an array of objects type Recipe
        new Recipe('Feijoada à brasileira', 'A junção perfeita entre várias carnes e o saboroso feijão preto', 'https://media-cdn.tripadvisor.com/media/photo-s/13/59/ea/ef/feijoada-brasileira.jpg'),
        new Recipe('Dobrada', 'Tradicional de Portugal', 'https://www.saborintenso.com/images/receitas/Dobrada-feijao-Branco-SI-1.jpg'),
        new Recipe('Polvo à Lagareiro','Acompanhado de uma salada e de vinho branco','https://www.saborintenso.com/images/receitas/Polvo-Lagareiro-SI-1.jpg')
    ]; 

    constructor() {}

    ngOnInit() {}

    onRecipeSelected(recipe: Recipe) {
        this.recipeWasSelected.emit(recipe);
    }
}
