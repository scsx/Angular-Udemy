import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

    ingredientsHere: Ingredient[]; // starts undefined, moved to service
    private subscriptionIgChange: Subscription;
    
    constructor(private slService: ShoppingListService) {}

    ngOnInit() {
        this.ingredientsHere = this.slService.getIngredients();
        this.subscriptionIgChange = this.slService.ingredientsChanged
            .subscribe(
                (ingredients: Ingredient[]) => {
                    this.ingredientsHere = ingredients; // update the array with changes
                }
            );
    }

    ngOnDestroy() {
        this.subscriptionIgChange.unsubscribe();
    }

    /* onIgredientAdded( ingredient: Ingredient ) {
        this.ingredientsHere.push(ingredient);
    } */

}
