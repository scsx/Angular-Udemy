import {
    Component,
    OnInit
} from '@angular/core';
import {
    DataService
} from "../../shared/data.service";

@Component({
    selector: 'app-japan',
    templateUrl: './japan.component.html',
    styles: []
})
export class JapanComponent implements OnInit {

    messageInJapan: string;

    constructor(private data: DataService) {}

    ngOnInit() {
        this.data.currentMessage.subscribe(messageAcross => this.messageInJapan = messageAcross);
    }

}
