import {
    Component,
    OnInit
} from '@angular/core';

@Component({
    selector: 'app-europe',
    templateUrl: './europe.component.html',
    styles: []
})
export class EuropeComponent implements OnInit {

    parentMessage = "Message from Europe!";

    constructor() {}

    ngOnInit() {
        console.log(this.parentMessage);
    }

}
