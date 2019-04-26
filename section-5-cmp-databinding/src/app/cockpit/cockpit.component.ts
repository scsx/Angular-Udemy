import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'app-cockpit',
    templateUrl: './cockpit.component.html',
    styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

    @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
    // with alias ('bpCreated') = reflects on app.cpt.html
    @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
    // from input [(ngModel)]="newServerContent" & "newServerContent"
    //newServerName = ''; //  comentado porque não faz falta com local reference (ver HTML)

    //newServerContent = ''; //  comentado porque não faz falta com local reference (ver HTML)

    @ViewChild('serverContentInputByLocalReference') serverContentInput: ElementRef; // serverContentInputByLocalReference = ver HTML

    constructor() {}

    ngOnInit() {}

    /*
    paramVindoDeLocalRef é um HTMLElement
    serverContentInput é um ElementRef (tem que se importar)
    */
    onAddServer( paramVindoDeLocalRef: HTMLInputElement ) {
        /*
        this.serverCreated.emit({
            serverName: paramVindoDeLocalRef.value, // .value pq é um HTMLElement
            serverContent: this.newServerContent
        });
        */
       this.serverCreated.emit({
            serverName: paramVindoDeLocalRef.value, // .value pq é um HTMLElement
            serverContent: this.serverContentInput.nativeElement.value
        });
    }

    onAddBlueprint( paramVindoDeLocalRef: HTMLInputElement ) {
        this.blueprintCreated.emit({
            serverName: paramVindoDeLocalRef.value,
            serverContent: this.serverContentInput.nativeElement.value
        });
    }
}
