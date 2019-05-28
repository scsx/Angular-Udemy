import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipes.model';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

    @Input() recipe: Recipe;
    @Input() index: number; // get index from recipe-list.cpt to pass to [routerLink]

    ngOnInit() {}

}
