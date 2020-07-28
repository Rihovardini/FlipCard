import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { first } from 'rxjs/operators';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ModalModel } from './modal.model';
import { ModalComponent } from './modal.component';
import { ModalCloseModel } from './modal-close.model';
import { ModalInjectorModel } from './modal-injector.model';

@Injectable()
export class ModalService {
    constructor(public dialog: MatDialog, private componentFactoryResolver: ComponentFactoryResolver) {}

    public openModal(openModelModel: ModalModel): ModalCloseModel {
        const currentDialogRef = this.dialog.open(ModalComponent, this.getModalConfig(openModelModel));
        const close = () => currentDialogRef.close();

        return { onClose: currentDialogRef.afterClosed().pipe(first()), close, data: openModelModel.data };
    }

    public closeAll(): void {
        this.dialog.closeAll();
    }

    private getModalConfig(openModelModel: ModalModel): MatDialogConfig {
        return {
            autoFocus: false,
            disableClose: true,
            data: this.getModalModel(openModelModel),
            restoreFocus: false,
            hasBackdrop: true
        };
    }

    private getModalModel({ component, data, injector }: ModalModel): ModalInjectorModel {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const refInjector = Injector.create({
            providers: [{ provide: component, useValue: component }],
            parent: injector
        });

        return { data, componentFactory, refInjector };
    }
}
