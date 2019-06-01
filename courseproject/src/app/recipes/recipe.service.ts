// service will be added to recipe.component -> providers: [RecipeService] to be available only there and it's children
import { Injectable } from '@angular/core';

import { Recipe } from './recipes.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class RecipeService {

    // recipes: Recipe[] inform Typescript that recipes is an array of objects of type Recipe
    private recipes: Recipe[] = [
        new Recipe(
            'Frango na Púcara',
            'Típico de Alcobaça',
            'https://www.saborintenso.com/images/receitas/Frango-na-Pucara-SI-1.jpg',
            [
                new Ingredient('Frango', 1),
                new Ingredient('Azeite', 150),
                new Ingredient('Batatas', 15)
            ]),
        new Recipe('Dobrada',
            'Tradicional de Portugal',
            'https://www.saborintenso.com/images/receitas/Dobrada-feijao-Branco-SI-1.jpg',
            [
                new Ingredient('Dobrada', 900),
                new Ingredient('Chouriço', 1),
                new Ingredient('Feijão vermelho', 100)
            ]),
        new Recipe('Patê de Atum',
            'Acompanhar com tostas',
            'https://www.saborintenso.com/images/receitas/Pate-de-Atum-SI-1.jpg',
            [
                new Ingredient('Atum', 2),
                new Ingredient('Maionese', 1),
                new Ingredient('Salsa', 5),
                new Ingredient('Cebola', 1)
            ]
        )
    ]; 
    
    constructor(private slService: ShoppingListService) {}

    getRecipes() {
        return this.recipes.slice(); // .slice() is not to mess the original array; creates a copy instead
    }
    
    // for recipe-detail.cpt get through routing
    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}