import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';

import { Card } from 'src/app/shared/interfaces/card';
import { CardModalComponent } from '../modals/card-modal/card-modal.component';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  public cards: Card[];

  public readonly displayedColumns: string[] = ['position', 'term', 'definition', 'actions'];

  private readonly deckId = this.route.snapshot.params.id;

  constructor(
    private route: ActivatedRoute,
    private modalService: ModalService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getCards();
  }

  public getCards(): void {
    this.apiService.getStudentCardsByDeckId(this.deckId).subscribe((response: Card[]) => {
      this.cards = response;
    });
  }

  public openEditModal(card: Card): void {
    const data = {
      ...card,
      action: 'Edit',
      methods: {
        approveHandler: this.editCard.bind(this)
      }
    };

    this.modalService.openModal({ component: CardModalComponent, data });
  }

  public addCard(card: Card): void {
    this.apiService.addCard(card).subscribe((card: Card) => {
      this.cards = [...this.cards, card];
    });
  }

  public openAddCardModal(): void {
    const data = {
      action: 'Add',
      deckId: this.deckId,
      methods: {
        approveHandler: this.addCard.bind(this)
      }
    }

    this.modalService.openModal({ component: CardModalComponent, data });
  }

  public editCard(card: Card): void {
    this.apiService.editCard(card).subscribe((editedCard: Card) => {
      this.cards = this.cards.map((card: Card) => (editedCard.id === card.id ? editedCard : card));
    });
  }

  public deleteCard(id: string): void {
    this.apiService.deleteCard(id).subscribe((deletedCard: Card) => {
      this.cards = this.cards.filter((card: Card) => card.id !== deletedCard.id);
    });
  }
}
