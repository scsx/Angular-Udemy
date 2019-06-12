import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipeStartComponent }, // no pathMatch: 'full' ?
        { path: 'new', component: RecipeEditComponent }, // new and edit are the same a)
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
        { path: ':id/edit', component: RecipeEditComponent } // new and edit are the same
    ]},
    { path: 'shopping-list', component: ShoppingListComponent }
];

/*
a) THE ORDER WAS CHANGED for path: 'new' and path: ':id' because if it came first angular would try to interpret it as an :id and got error:
ERROR TypeError: Cannot read property 'ingredients' of undefined
    at Object.eval [as updateDirectives]

MAX EXPLANATION:
:id means that id is a dynamic path segment, yes. And ordering is important because Angular parses routes (from the route config) from top to bottom. And if we have recipes/:id and then recipes/new, an URL of recipes/new would of course also match recipes/:id. Because :id can be anything and it doesn't look further.
*/

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [RecipesResolverService]
})

export class AppRoutingModule {

}