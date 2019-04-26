import { Component, ViewEncapsulation, ContentChild, ElementRef,
OnInit, Input, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy
} from '@angular/core';

@Component({
    selector: 'app-server-element',
    templateUrl: './server-element.component.html',
    styleUrls: ['./server-element.component.css'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class ServerElementComponent implements
OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

    // passando um alias 'srvElement' pode-se dar outro nome e é este que se chama fora
    // senão seria só element
    @Input ('srvElement') element: { type: string, name: string, content: string};
    /*
    Falta código das aulas 75/76
    */

   @ContentChild('contentParagraph') paragraph: ElementRef;

    constructor() {
        console.log("constructor called: " + Date.now());
    }

    ngOnChanges(alteracoes: SimpleChanges) { // only hook with argument
        console.log("ngOnChanges called: " + Date.now());
        console.log(alteracoes); // output element de @Input ('srvElement') element: { type: string, name: string, content: string};
    }
    ngOnInit() {
        console.log("ngOnInit called: " + Date.now());
        console.log("Paragraph text: " + this.paragraph.nativeElement.textContent); // this.paragraph empty
    }
    ngDoCheck() {
        console.log("ngDoCheck called: " + Date.now());
    }
    ngAfterContentInit() {
        console.log("ngAfterContentInit called: " + Date.now());
        console.log("Paragraph text: " + this.paragraph.nativeElement.textContent); // this.paragraph OK
    }
    ngAfterContentChecked() {
        console.log("ngAfterContentChecked called: " + Date.now());
    }
    ngAfterViewInit() {
        console.log("ngAfterViewInit called: " + Date.now());
    }
    ngAfterViewChecked() {
        console.log("ngAfterViewChecked called: " + Date.now());
    }
    ngOnDestroy() {
        console.log("OnDestroy called");
    }

}
