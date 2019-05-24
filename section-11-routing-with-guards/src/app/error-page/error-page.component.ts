import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html'
})
export class ErrorPageComponent implements OnInit {

    errorMessage: string;

    constructor( private actRoute: ActivatedRoute ) {}

    ngOnInit() {
        this.errorMessage = this.actRoute.snapshot.data['message']; // get on init
        this.actRoute.data.subscribe(
            (newData: Data) => {
                this.errorMessage = newData['message'];             // update if already on page
            }
        );   
    }

}
