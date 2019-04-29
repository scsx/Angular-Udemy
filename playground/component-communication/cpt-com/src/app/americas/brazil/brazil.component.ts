import {
    Component,
    OnInit,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
    selector: 'app-brazil',
    templateUrl: './brazil.component.html',
    styles: []
})
export class BrazilComponent implements OnInit {

    message: string = "Olá!"
    messageBye: string = "Adeus!"

    @Output() messageEvent = new EventEmitter < string > ();

    constructor() {}

    sayHi() {
        this.messageEvent.emit(this.message)
    }

    sayBye() {
        this.messageEvent.emit(this.messageBye)
    }

    ngOnInit() {

    }

}
