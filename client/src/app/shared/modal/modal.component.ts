import { Component, ComponentRef, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ModalInjectorModel } from './modal-injector.model';

@Component({
    selector: 'sb-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnDestroy {
    @ViewChild('viewContainerRef', { read: ViewContainerRef, static: true }) private viewContainerRef: ViewContainerRef;

    private componentRef: ComponentRef<any>;

    constructor(
        @Inject(MAT_DIALOG_DATA) private modalData: ModalInjectorModel,
        private dialogRef: MatDialogRef<ModalComponent>
    ) {}

    public ngOnInit(): void {
        if (this.modalData) {
            this.appendDialogComponentToBody();
        }
    }

    public ngOnDestroy(): void {
        if (this.componentRef) {
            this.destroyComponent();
        }
    }

    private appendDialogComponentToBody(): void {
        
        const { data, componentFactory, refInjector } = this.modalData;

        this.viewContainerRef.clear();
        this.componentRef = this.viewContainerRef.createComponent(componentFactory, 0, refInjector);
        this.componentRef.instance.data = data;
        this.componentRef.instance.parentRef = this.componentRef;
        this.componentRef.instance.closeEvent.subscribe((closeData: any) => {
            this.closeModal(closeData);
        });
    }

    private destroyComponent(): void {
        this.componentRef.destroy();
    }

    private closeModal(data: any): void {
        this.dialogRef.close(data);
    }
}
