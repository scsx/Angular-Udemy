import {
    Component,
    OnInit
} from '@angular/core';

@Component({
    selector: 'app-americas',
    templateUrl: './americas.component.html',
    styles: []
})
export class AmericasComponent implements OnInit {

    constructor() {}

    messageFromBrazil: string;

    receiveMessage($event) {
        this.messageFromBrazil = $event
    }

    reset() {
        this.messageFromBrazil = ""
    }

    ngOnInit() {}

}
