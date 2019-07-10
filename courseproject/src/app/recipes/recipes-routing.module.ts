// this file is optional and the routes could be done in recipes.module; see how on shopping-list.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipesResolverService } from './recipes-resolver.service';

const routes: Routes = [
    { path: '', // was 'recipes' but was changed because of lazy loading; it's empty because we're already in /recipes
        component: RecipesComponent,
        canActivate: [AuthGuard], children:
        [
            { path: '', component: RecipeStartComponent }, // no pathMatch: 'full' ?
            { path: 'new', component: RecipeEditComponent }, // new and edit are the same a)
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeEditComponent } // new and edit are the same
    ]}
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RecipesRoutingModule {}