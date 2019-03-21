import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-cockpit',
    templateUrl: './cockpit.component.html',
    styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

    @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
    // with alias = reflects on app.cpt.html
    @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();

    // from input [(ngModel)]="newServerContent" & "newServerContent"
    //newServerName = ''; //  comentado porque não faz falta com local reference (ver HTML)

    // Se aqui devia estar @ViewChild ver Section 5 Aula 70
    newServerContent = '';

    constructor() {}

    ngOnInit() {}

    onAddServer( paramVindoDeLocalRef: HTMLInputElement ) {
        this.serverCreated.emit({
            serverName: paramVindoDeLocalRef.value,
            serverContent: this.newServerContent
        });
    }

    onAddBlueprint( paramVindoDeLocalRef: HTMLInputElement ) {
        this.blueprintCreated.emit({
            serverName: paramVindoDeLocalRef.value,
            serverContent: this.newServerContent
        });
    }

}
