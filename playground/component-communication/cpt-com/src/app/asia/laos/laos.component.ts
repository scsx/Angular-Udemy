import {
    Component,
    OnInit
} from '@angular/core';
import {
    DataService
} from "../../shared/data.service";

@Component({
    selector: 'app-laos',
    templateUrl: './laos.component.html',
    styles: []
})
export class LaosComponent implements OnInit {

    messageInLaos: string;

    constructor(private data: DataService) {}

    ngOnInit() {
        this.data.currentMessage.subscribe(messageAcross => this.messageInLaos = messageAcross)
    }

    newMessage() {
        this.data.changeMessage("Hello from Laos!")
    }

}
