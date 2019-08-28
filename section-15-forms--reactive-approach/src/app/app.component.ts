import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    genders = ['male', 'female'];

    signupForm: FormGroup; // (ngForm from template approach ends up being a FormGroup as well)

    forbiddenUserNames = ['rui', 'xico', 'ana']; // used by custom validator

    ngOnInit() {
        // INITIALIZE FORM // receives javascript object with controls, one for each field
        this.signupForm = new FormGroup({
            // custom group userDigitalData (FormGroup inside FormGroup)
            'userDigitalData': new FormGroup({
                // a) arguments explained at the bottom
                'ctrlUsername': new FormControl('Joe Placeholder', [
                    Validators.required,
                    this.forbiddenNames.bind(this) // bind because this function will NOT be executed here, but in another Angular place
                ]),
                // Validators.required should be referenced but not called [ex: Validators.required()]
                'ctrlEmail': new FormControl(null, [
                    Validators.required,
                    Validators.email
                ], this.forbiddenEmails),
            }),
            'ctrlGender': new FormControl('male'),
            //'ctrlArrHobbies': new FormArray([]) // array of controls; starts empty or:
            'ctrlArrHobbies': new FormArray([
                new FormControl('Coding'),
                new FormControl('Driving cars'),
                new FormControl('Dancing')
            ])
        });

        // see changes on the form
        this.signupForm.valueChanges.subscribe(
            (value) => console.log(value)
        );
        // see changes on the form status (INVALID, PENDING, VALID)
        this.signupForm.statusChanges.subscribe(
            (status) => console.log("statusChanges is: " + status)
        );

    }

    // SET VALUES FOR *ENTIRE* FORM
    fillForm() {
        this.signupForm.setValue({
            'userDigitalData': {
                'ctrlUsername': 'Ana',
                'ctrlEmail': 'ana@me.com'
            },
            'ctrlGender': 'female',
            'ctrlArrHobbies': [
                'Coding',
                'Driving cars',
                'Dancing'
            ]
        });
    }

    // SET VALUES FOR SOME FIELDS
    fillName() {
        this.signupForm.patchValue({
            'userDigitalData': {
                'ctrlUsername': 'Max'
            }
        });
    }

    // RESET
    resetForm() {
        this.signupForm.reset(); // object can be passed to clear just some fields
    }
    
    // ADD HOBBY
    // if problems: 207 Fixing a bug -> https://www.udemy.com/the-complete-guide-to-angular-2/learn/lecture/15320312
    onAddHobby() {
        const control = new FormControl(null, Validators.required);
        (<FormArray>this.signupForm.get('ctrlArrHobbies')).push(control);
    }


    // CUSTOM VALIDATOR
    forbiddenNames( controlName: FormControl ): {[s: string]: boolean } {
        // : {[s: string]: boolean }  -> should return an object with the following format: { namesIsOk: true }
        if ( this.forbiddenUserNames.indexOf(controlName.value) !== -1 ) { // -1 is true so check if its not (?)
            return { 'nameIsForbidden': true };
        }
        return null; // NULL, not false!
    }

    // CUSTOM VALIDATOR ASYNC (simulated)
    forbiddenEmails( controlEmail: FormControl ): Promise<any> | Observable<any> { // returns Promise or Observable
        const promise = new Promise<any>(( resolve, reject) => {
            setTimeout(() => {
                if ( controlEmail.value === 'me@example.com') {
                    resolve({'emailNotOk': true});
                } else {
                    resolve(null);
                }
            }, 3000);
        });
        return promise;
    }

    onSubmit() {
        console.log( this.signupForm );
    }

}


/*
a) ARGS - new FormControl(
            initial value,
            validator single or array like forbiddenNames,
            async validators like forbiddenEmails )
               
*/