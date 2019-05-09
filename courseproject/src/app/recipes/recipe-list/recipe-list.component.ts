import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

    recipes: Recipe[]; // starts undefined, was moved to recipe.service

    constructor(private recipeService: RecipeService) {}

    ngOnInit() {
        this.recipes = this.recipeService.getRecipes();
    }

}
