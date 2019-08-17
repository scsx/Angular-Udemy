import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../logging.service';

import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
    selector: 'app-shopping-list',
    templateUrl: './shopping-list.component.html'
})

export class ShoppingListComponent implements OnInit, OnDestroy {

    ingredients: Observable<{ ingredients: Ingredient[]}>;
    private subscription: Subscription;

    constructor(
        private loggingService: LoggingService,
        private store: Store<fromShoppingList.IAppState>
        // Store< XXX > is what the reducer will "yeld"
    ) {}

    ngOnInit() {
        // GET STORE
        // select selects parts of the store, returns an observable; doesnt need unsubscribe()
        this.ingredients = this.store.select('shoppingList');
        // .subscribe() is not used here but could

        this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
    }

    onEditItem(index: number) {
        this.store.dispatch( new ShoppingListActions.StartEdit(index) );
    }

    ngOnDestroy() {
        //this.subscription.unsubscribe();
    }
}
