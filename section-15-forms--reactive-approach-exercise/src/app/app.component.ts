import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

import { CustomValidators } from './custom-validators'; // CUSTOM VALIDATOR

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    projForm: FormGroup;
    statusPossible: string[] = [ 'stable', 'critical', 'finished'];

    ngOnInit() {
        
        // init form
        this.projForm = new FormGroup({
            'projName': new FormControl(
                null,
                Validators.required,
                this.checkForbiddenName.bind(this) // BINDING IS NEEDED!
            ),
            'projEmail': new FormControl(
                null,
                [
                    Validators.required,
                    Validators.email
                ]
            ),
            'projStatus': new FormControl('stable'),
            'projSupervisor': new FormControl(
                null,
                [
                    Validators.required,
                    CustomValidators.invalidSupervisor.bind(this)
                    // the method we defined externally - referenced, not executed
                    // execution will be made by angular and so we need to bind it
                ],
                CustomValidators.AsyncInvalidSupervisor
                //this.checkForbiddenName.bind(this) // BINDING IS NEEDED!
            )
        });

    }

    // CUSTOM VALIDATOR
    checkForbiddenName( ctrlName: FormControl ): Promise<any> | Observable<any> {
        const promise = new Promise<any>(( resolve, reject) => {
            setTimeout(() => {
                if ( ctrlName.value === 'test') {
                    resolve({'nameIsTest': true});
                } else {
                    resolve(null);
                }
            }, 1000);
        });
        return promise;
    }

    onSubmit() {
        console.log( this.projForm.value );
    }

}
