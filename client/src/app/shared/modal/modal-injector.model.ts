import { Injector } from '@angular/core';

export class ModalInjectorModel {
    constructor(public data: any, public componentFactory: any, public refInjector: Injector) {}
}
