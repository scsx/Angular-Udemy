import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

    @Input() defaultColor: string = "transparent";
    @Input() highlightColor: string = "#7dcfe0"; // Pode ter um alias @Input('appBetterHighlight'); muda no html

    @HostBinding('style.backgroundColor') backgroundColorExample: string;

    constructor(private elRef: ElementRef, private renderer: Renderer2) {}

    ngOnInit() {

        this.backgroundColorExample = this.defaultColor;

        this.renderer.setStyle(this.elRef.nativeElement, 'padding', '15px');
        this.renderer.setStyle(this.elRef.nativeElement, 'color', '#333');
        this.renderer.setStyle(this.elRef.nativeElement, 'font-weight', '700');

        const span = this.renderer.createElement('span');
        const text = this.renderer.createText(" (and I'm a span)");
        this.renderer.appendChild(span, text);
        this.renderer.appendChild(this.elRef.nativeElement, span);
    }

    @HostListener('mouseenter') mouseover() { // without event
        //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', '#7dcfe0'); // USING RENDERER

        this.backgroundColorExample = this.highlightColor;  // USING @HostBinding
    }

    @HostListener('mouseleave') mouseleave(eventData: Event) { // with event; can be custom
        //this.renderer.setStyle(this.elRef.nativeElement, 'background-color', '#fff'); // USING RENDERER
        //console.log(eventData); // testing event, undefined...

        this.backgroundColorExample = this.defaultColor;   // USING @HostBinding
    }

}
