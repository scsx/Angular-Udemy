import {
    Component,
    ViewChild,
    AfterContentInit
} from '@angular/core';
import {
    GhanaComponent
} from '../africa/ghana/ghana.component';

@Component({
    selector: 'app-africa',
    templateUrl: './africa.component.html',
    styles: []
})
export class AfricaComponent implements AfterContentInit {

    // check for the need of 2nd argument on Angular8
    @ViewChild(GhanaComponent) child;

    constructor() {}

    messageFromGhana: string;

    ngAfterContentInit() {
        this.messageFromGhana = this.child.messageFromChild
    }

}
