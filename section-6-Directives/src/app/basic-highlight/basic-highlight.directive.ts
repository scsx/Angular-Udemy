import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
    selector: '[appBasicHighlightSelector]' // a Directive needs at least a selector
})

export class BasicHighlightDirective implements OnInit {

    constructor(private elementRefSomeName: ElementRef) {}

    ngOnInit() {
        this.elementRefSomeName.nativeElement.style.backgroundColor = 'green';
        this.elementRefSomeName.nativeElement.style.color = 'white';
        this.elementRefSomeName.nativeElement.style.padding = '15px';
    }
}