// service will be added to app.module to be avilable at recipes section too
 
import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
    
    ingredientsChanged = new EventEmitter<Ingredient[]>(); // because we are using a copy of ingredients[] ( ingredients.slice() ) we use a EventEmitter to inform other components of the changes we might make

    private ingredients: Ingredient[] = [
        new Ingredient('Azeite', 5),
        new Ingredient('Atum', 10),
        new Ingredient('Ovos', 3)
    ];
    
    getIngredients() {
        return this.ingredients.slice();  // .slice() to keep original array; creates a copy instead / reflects on ingredientsChanged
    }
    
    addIngredient(ingrdt: Ingredient) {
        this.ingredients.push(ingrdt);
        this.ingredientsChanged.emit(this.ingredients.slice()); // Emitter to inform other components of the changes we might make
    }

    addIngredients(ingredients: Ingredient[]) {
        /* this would work fine, just emits too much events:
        for (let ingrd of ingredients) {
            this.addIngredient(ingrd);
        }
        */
       this.ingredients.push(...ingredients);
       // spread operator: converts an array to a list; without this the entire array would be added as an entry instead of 1 by 1
       this.ingredientsChanged.emit(this.ingredients.slice()); // Emitter to inform other components of the changes we just made
    }
}