import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        // CommonModule, // removed because now it's being provided by SharedModule
        FormsModule,
        RouterModule.forChild([
            { path: '', component: ShoppingListComponent } // path empty now because it's lazy loaded
        ]),
        SharedModule
    ]
})

export class ShoppingListModule {}