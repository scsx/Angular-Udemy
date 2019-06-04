import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    @ViewChild('formElReferencia', { static: false }) theFormByViewChild: NgForm;

    defaultQuestionTS = "pet"; // select value
    defaultEmailTS = "me@example.com";
    answer = "";
    genders = ["male","female"];
    suggestedName = 'Bob Ray Martins';

    finalData = {
        username: '',
        email: '',
        secretQuestion: '',
        answer: '',
        gender: ''
    };
    submitted = false;


    populateFields() { 
        this.theFormByViewChild.setValue({ // receives the js object 'ngForm'
            userData: {
                username: this.suggestedName,
                email: "bob.ray@example.com"
            },
            secret: 'pet',
            questionAnswer: 'Bobi Dog',
            gender: 'male'
        });
    }

    suggestUserName() {
        this.theFormByViewChild.form.patchValue({
            userData: {
                username: this.suggestedName
            }
        });
    }

    onSubmit( theForm: NgForm ) {
        console.log(theForm);
    }

    onSubmitWithViewChild() {
        console.log(this.theFormByViewChild);
        this.submitted = true;

        this.finalData.username = this.theFormByViewChild.value.userData.username;
        this.finalData.email = this.theFormByViewChild.value.userData.email;
        this.finalData.secretQuestion = this.theFormByViewChild.value.secret;
        this.finalData.answer = this.theFormByViewChild.value.questionAnswer;
        this.finalData.gender = this.theFormByViewChild.value.gender;

        this.theFormByViewChild.reset(); // empties fields and classes like ng-dirty, etc
    }

    // extra: click to copy
    onCopy(textToCopy: any) { // its not HTMLElement
        textToCopy.select();
        document.execCommand('copy');
        textToCopy.setSelectionRange(0, 0);
    }

}
