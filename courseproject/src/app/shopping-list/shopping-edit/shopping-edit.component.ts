import {
    Component,
    OnInit,
    ElementRef,
    ViewChild,
    EventEmitter,
    Output
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

    @ViewChild('nameInput') nameInputRef: ElementRef;
    @ViewChild('amountInput') amountInputRef: ElementRef;

    /* ingredientAdded = new EventEmitter<{name: string, amount: number}>(); */ // The same as:
    @Output() ingredientAdded = new EventEmitter<Ingredient>();

    constructor() {}

    ngOnInit() {}

    onAddItem() {
        const ingName = this.nameInputRef.nativeElement.value;
        const ingAmout = this.amountInputRef.nativeElement.value;
        const newIngredient = new Ingredient(ingName, ingAmout);
        this.ingredientAdded.emit(newIngredient);
    }
}
