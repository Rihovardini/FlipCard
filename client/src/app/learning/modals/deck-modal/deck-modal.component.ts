import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { BaseModalTemplateComponent } from 'src/app/shared/modal/base-modal-template';
import { notEmpty } from 'src/app/shared/validators/not-empty';

@Component({
  selector: 'app-deck-modal',
  templateUrl: './deck-modal.component.html',
  styleUrls: ['./deck-modal.component.scss']
})
export class DeckModalComponent extends BaseModalTemplateComponent implements OnInit {
  public deckForm: FormGroup;

  constructor (private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.deckForm = this.buildCardForm();
  }

  public onConfirm(): void {
    const { value } = this.deckForm;

    if (this.data.methods && this.data.methods.approveHandler) {
      const { approveHandler } = this.data.methods;

      approveHandler(value);
    }
    
    this.onClose();
  }

  private buildCardForm(): FormGroup {
    return this.formBuilder.group({
      name: [this.data.name || '', [Validators.required, notEmpty]],
      description: [this.data.description || '', [notEmpty]],
      id: [this.data.id || '']
    });
  }
}
