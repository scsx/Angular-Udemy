import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

    @ViewChild('nameInput') nameInputRef: ElementRef;
    @ViewChild('amountInput') amountInputRef: ElementRef;

    /* ingredientAdded = new EventEmitter<{name: string, amount: number}>(); */ // The same as:
    //@Output() ingredientAdded = new EventEmitter<Ingredient>();
    // meanwhile removed because service does this

    constructor(private slService: ShoppingListService) {}

    ngOnInit() {}

    onAddItem() {
        const ingName = this.nameInputRef.nativeElement.value;
        const ingAmout = this.amountInputRef.nativeElement.value;
        const newIngredient = new Ingredient(ingName, ingAmout);
        this.slService.addIngredient(newIngredient);
    }
}
