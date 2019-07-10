import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';

import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        RecipeDetailComponent,
        RecipeItemComponent
        // DropdownDirective // this is needed on recipes but not being called; fixed later because " you can declare a component, directive or pipe only once in your app"
    ],
    imports: [
        RouterModule,
        // CommonModule, // CommonModule because BrowserModule can only be imported once, in AppModule; // removed because now it's being provided by SharedModule
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ],
    exports: [
        // no need to export because we're using them *internally*, with RecipesRoutingModule
        /* RecipesComponent, RecipeListComponent, RecipeStartComponent, RecipeEditComponent, RecipeDetailComponent, RecipeItemComponent */
    ]
})

export class RecipesModule {}