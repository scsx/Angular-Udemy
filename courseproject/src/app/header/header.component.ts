import { Component } from '@angular/core';
import { RecipesHttpService } from '../shared/recipes-http.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    
    constructor( private recHttpService: RecipesHttpService) {}

    onSaveData() {
        this.recHttpService.storeRecipes();
    }

}
