import {
    Component,
    OnInit,
    Input
} from '@angular/core';

@Component({
    selector: 'app-italy',
    templateUrl: './italy.component.html',
    styles: []
})
export class ItalyComponent implements OnInit {

    @Input() childMessage: string;

    constructor() {}

    ngOnInit() {}

}
