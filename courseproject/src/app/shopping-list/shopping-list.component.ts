import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

    ingredientsHere: Ingredient[]; // starts undefined, moved to service
    
    constructor(private slService: ShoppingListService) {}

    ngOnInit() {
        this.ingredientsHere = this.slService.getIngredients();
        this.slService.ingredientsChanged
            .subscribe(
                (ingredients: Ingredient[]) => {
                    this.ingredientsHere = ingredients; // update the array with changes
                }
            );
    }

    /* onIgredientAdded( ingredient: Ingredient ) {
        this.ingredientsHere.push(ingredient);
    } */

}
