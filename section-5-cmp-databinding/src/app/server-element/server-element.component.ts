import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-server-element',
    templateUrl: './server-element.component.html',
    styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {

    // passando um alias 'srvElement' pode-se dar outro nome e é este que se chama fora
    // senão seria só element
    @Input ('srvElement') element: { type: string, name: string, content: string};

    constructor() { }

    ngOnInit() { }

}
