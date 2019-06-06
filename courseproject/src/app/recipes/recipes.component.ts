import { Component, OnInit } from '@angular/core';
//import { RecipeService } from './recipe.service'; a)

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.scss']
    //,providers: [RecipeService] a)
})
export class RecipesComponent implements OnInit {

    constructor() {}

    ngOnInit() {}

}
/*
a) removed because the instance of this service was destroyed when the component recipes was destroyed. When going to shopping-list the new recipes were lost because of this;
to fix the provider was moved to appModule
*/