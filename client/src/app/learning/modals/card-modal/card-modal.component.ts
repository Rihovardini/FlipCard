import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BaseModalTemplateComponent } from 'src/app/shared/modal/base-modal-template';
import { notEmpty } from 'src/app/shared/validators/not-empty';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent extends BaseModalTemplateComponent implements OnInit{
    public cardForm: FormGroup;

    constructor (private formBuilder: FormBuilder) {
      super();
    }

    public ngOnInit(): void {
      this.cardForm = this.buildCardForm();
    }

    public onConfirm(): void {
      const { value } = this.cardForm;

      if (this.data.methods && this.data.methods.approveHandler) {
        const { approveHandler } = this.data.methods;

        approveHandler(value);
      }
      
      this.onClose();
    }

    private buildCardForm(): FormGroup {
      return this.formBuilder.group({
        term: [this.data.term || '', [Validators.required, notEmpty]],
        definition: [this.data.definition || '', [Validators.required, notEmpty]],
        id: [this.data.id || ''],
        deckId: [this.data.deckId || '']
      });
    }
}
