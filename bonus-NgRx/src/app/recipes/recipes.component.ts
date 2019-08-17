import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html'
})
export class RecipesComponent implements OnInit {

    @ViewChild('apprecipelist', { static: true }) child;
    
    constructor() {}

    ngOnInit() {}

   onNewRecipe() {
       this.child.onNewRecipe();
   }

}
