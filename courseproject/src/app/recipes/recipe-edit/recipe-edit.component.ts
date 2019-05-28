import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit {

    recId: number;
    editMode: boolean = false;

    constructor( private actRoute: ActivatedRoute) {}

    ngOnInit() {
        this.actRoute.params.subscribe(
            (parametros: Params) => {
                this.recId = +parametros['id'];
                this.editMode = parametros['id'] != null;
                // editcomponent is used as 'edit' and as 'new';
                // to see which is we check for the existence of parameter 'id'
                // recipe/new VS recipes/1
            }
        );
    }

}
