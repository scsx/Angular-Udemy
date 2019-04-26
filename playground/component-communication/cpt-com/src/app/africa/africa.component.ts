import {
    Component,
    ViewChild,
    ngAfterContentInit
} from '@angular/core';
import {
    GhanaComponent
} from '../africa/ghana/ghana.component';

@Component({
    selector: 'app-africa',
    templateUrl: './africa.component.html',
    styles: []
})
export class AfricaComponent implements ngAfterContentInit {

    @ViewChild(GhanaComponent) child;

    constructor() {}

    messageFromGhana: string;

    ngAfterContentInit() {
        this.messageFromGhana = this.child.messageFromChild
    }

}
