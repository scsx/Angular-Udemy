import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html'
})

export class RecipeEditComponent implements OnInit {

    recId: number;
    editMode: boolean = false;
    recipeForm: FormGroup;

    constructor(private actRoute: ActivatedRoute,
                private recipeService: RecipeService,
                private router: Router) {}

    ngOnInit() {
        this.actRoute.params.subscribe(
            (parametros: Params) => {
                this.recId = +parametros['id'];
                this.editMode = parametros['id'] != null;
                // this component is used as 'edit' and as 'new'; to see which is we check for the existence of parameter 'id':
                // recipe/new VS recipes/1

                // when the params change (inside subscribe) that's when we initialize the form:
                this.initForm();
            }
        );
    }

    // added because of Angular 8
    getControls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    private initForm() { // call above
        // empty strings in case of new recipe
        let recipeName = '';
        let recipeDescription = '';
        let recipeImagePath = '';
        let recipeIngredients = new FormArray([]); // FormArray is a bit like FormGroup and it’s used in a very similar way, the difference being that it’s used as an array that wraps around an arbitrary amount of FormControl, FormGroup or even other FormArray instances.

        // or current values in recipe edit
        if (this.editMode) {
            const recipe = this.recipeService.getRecipe(this.recId); // get the current Recipe object
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;

            if (recipe.ingredients) {
                for (let ing of recipe.ingredients) {
                    recipeIngredients.push( // push a FormGroup with multiple FormControls into the FormArray
                        new FormGroup({ // b) control names, see below
                            'name': new FormControl(ing.name, Validators.required),
                            'amount': new FormControl(ing.amount, [
                                Validators.required,
                                Validators.pattern(/^[1-9]+[0-9]*$/) // the same as in shopping-edit.cpt.html
                            ])
                        })
                    );
                }
            }
        }

        this.recipeForm = new FormGroup({ // b) control names, see below
            'name': new FormControl(recipeName, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'ingredients': recipeIngredients // was already declared with let recipeIngredients = new FormArray([])
        });
    }

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push( // (a) see explanation of code below
            new FormGroup({ // b) control names, see below
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/) // the same as in shopping-edit.cpt.html
                ])
            })
        )
    }

    onDeleteIngredient(index: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);// (a); removeAt: remove control
    }

    onSubmit() {
        console.log( this.recipeForm.value );
        /*
        const newRecipe = new Recipe(
            this.recipeForm.value['name'],
            this.recipeForm.value['description'],
            this.recipeForm.value['imagePath'],
            this.recipeForm.value['ingredients']
        );
        if we wanted to work the format we could do it here and send this.recipeService.updateRecipe(this.recId, newRecipe);
        No need to because the form value should be in the right format already:
        */
        if (this.editMode) {
            this.recipeService.updateRecipe(this.recId, this.recipeForm.value);
            console.log("this.recId" + this.recId);
        } else {
            this.recipeService.addRecipe(this.recipeForm.value);   
        }
        // we're done, we can navigate away:
        this.onCancel();
    }

     onCancel() {
        // leave page when cancel, need router
        this.router.navigate(['../'], { relativeTo: this.actRoute } );
    }
    

}
/*
a)
You have to tell TypeScript that this.recipeForm.get('ingredients')) is a FormArray which has a push method. The angle brackets <> (typescript cast) are used to say TS: "You don't know that this is a FormArray, but I know. Please don't throw an error when I call push on this FormArray!".
The parentheses are required, since not this.recipeForm is the FormArray, but this.recipeForm.get('ingredients')).
You could also write:
(this.recipeForm.get('ingredients') as FormArray).push(...)

b)
Initially the control names where modified to be more recognizable (fieldName, fieldDesc, etc)
This didn't work with this.recipeForm.value because the value would send these names as keys and these are not recognized by the service/model.
It still could be achieved by declaring them explicitly in a var:
        const newRecipe = new Recipe(
            this.recipeForm.value['name'],
            this.recipeForm.value['description'],
            this.recipeForm.value['imagePath'],
            this.recipeForm.value['ingredients']
        );
and sending it instead of this.recipeForm.value:
        (this.recId, newRecipe)
*/