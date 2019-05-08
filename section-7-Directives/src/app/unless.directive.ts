import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appUnless]'
})
export class UnlessDirective {

    // This directive does the opposite of ngIf

    @Input() set appUnless(condition: boolean) { // set makes this property(member?) into a method; name MUST be the same as directive (appUnless)
        if (!condition) {
            this.vcRef.createEmbeddedView(this.templateRef);
        } else {
            this.vcRef.clear();
        }
    }
    constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {

    }

}
