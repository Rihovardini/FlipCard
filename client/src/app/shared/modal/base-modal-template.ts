import { Input, Output, EventEmitter } from '@angular/core';

export abstract class BaseModalTemplateComponent {
    @Input() public data: any;

    @Output() private closeEvent = new EventEmitter<any>();

    public onClose(data?: any): void {
        this.closeEvent.next(data);
    }
}
