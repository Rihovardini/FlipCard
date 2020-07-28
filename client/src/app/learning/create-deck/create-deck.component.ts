import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { notEmpty } from 'src/app/shared/validators/not-empty';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-deck',
  templateUrl: './create-deck.component.html',
  styleUrls: ['./create-deck.component.scss']
})
export class CreateDeckComponent {
  public deckForm = this.buildDeckForm();

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  public createDeck(): void {
    const { id: studentId } = this.authService.getUserInfo();

    this.apiService.createDeck({ ...this.deckForm.value, studentId }).subscribe(({ id }) => {
      this.router.navigate([`/student/decks/${id}`]);
    });
  }

  private buildDeckForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(128), notEmpty]],
      description: ['', [Validators.maxLength(255)]]
    });
  }
}
