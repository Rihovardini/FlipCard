import { Observable } from 'rxjs';

export class ModalCloseModel {
    public onClose: Observable<any>;
    public close: () => void;
    public data: any;
}
