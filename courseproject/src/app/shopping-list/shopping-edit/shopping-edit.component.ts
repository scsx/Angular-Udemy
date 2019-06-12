import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

    @ViewChild('formLocalRef', {static: false} ) slForm: NgForm;
    subscriptionToEdit: Subscription;
    editMode = false;
    editedItemIndex: number;
    editedItem: Ingredient;

    constructor(private slService: ShoppingListService) {}

    ngOnInit() {
        // listen to the service ingredient being edited
        this.subscriptionToEdit = this.slService.ingredientBeingEdited.subscribe(
            (index: number) => {
                this.editMode = true;
                this.editedItemIndex = index;
                this.editedItem = this.slService.getSingleIngredient(index);
                this.slForm.setValue({
                    nameName: this.editedItem.name,
                    nameAmount: this.editedItem.amount
                });
            }
        );
    }

    onSubmitItem( form: NgForm ) {
        const val = form.value;
        const newIngredient = new Ingredient(val.nameName, val.nameAmount);
        if (this.editMode) {
            this.slService.updateIngredient(this.editedItemIndex, newIngredient);
        } else {
            this.slService.addIngredient(newIngredient);
        }
        this.editMode = false; // reset buttons and apperance
        form.reset();
    }

    onClear() {
        this.slForm.reset();
        this.editMode = false; // reset buttons and apperance
    }

    onDelete() {
        this.slService.deleteIngredient(this.editedItemIndex);
        this.onClear();
    }

    ngOnDestroy(){
        this.subscriptionToEdit.unsubscribe();
    }
}
