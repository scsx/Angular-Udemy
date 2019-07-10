import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
// recipes routing cpts and guard were moved to it's module (recipes-routing.module)

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
     // Lazy loaded:
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
    // path to TS # Name of the class
    // because it's lazy loaded cannot be imported again "eagerly" (at app.module)

    //other routes were moved to their newly created modules, in either module file or new routing file
];

/*
a) THE ORDER WAS CHANGED for path: 'new' and path: ':id' because if it came first angular would try to interpret it as an :id and got error:
ERROR TypeError: Cannot read property 'ingredients' of undefined
    at Object.eval [as updateDirectives]

MAX EXPLANATION:
:id means that id is a dynamic path segment, yes. And ordering is important because Angular parses routes (from the route config) from top to bottom. And if we have recipes/:id and then recipes/new, an URL of recipes/new would of course also match recipes/:id. Because :id can be anything and it doesn't look further.
*/

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {
        preloadingStrategy: PreloadAllModules // preload lazy modules, instead of loading them only when they're actually needed
        // , enableTracing: true // trace navigation info
        })],
    exports: [RouterModule],
    providers: [RecipesResolverService]
})

export class AppRoutingModule {}