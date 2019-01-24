import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

    recipes: Recipe[] = [ // (recipes: Recipe[]...) inform Typescript that recipes is an array of objects type Recipe
        new Recipe('Feijoada', 'À moda do Brasil', 'https://images.e-konomista.pt/articles/850_400_feijoada_1525958746.jpg'),
        new Recipe('Dobrada', 'À moda do Minho', 'https://images.e-konomista.pt/articles/850_400_feijoada_1525958746.jpg')
    ]; 

    constructor() {}

    ngOnInit() {
        console.log(this.recipes[0].name);
    }

}
