import { Injector, Type } from '@angular/core';

export class ModalModel {
    constructor(public component: Type<any>, public data: any, public injector?: Injector) {}
}
