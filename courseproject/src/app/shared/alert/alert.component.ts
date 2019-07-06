import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent {

    @Input() message: string;
    @Output() close = new EventEmitter<void>();
    
    onClose() {
        this.close.emit();
    }
    
}