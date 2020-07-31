import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';
import { Deck } from 'src/app/shared/interfaces/deck';
import { ModalService } from 'src/app/shared/modal/modal.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DeckModalComponent } from '../modals/deck-modal/deck-modal.component';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.scss']
})
export class DecksComponent implements OnInit {
  public decks: Deck[] = [];

  constructor(
    private modalService: ModalService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDecks();
  }

  public getDecks(): void {
    const { id } = this.authService.getUserInfo();
    this.apiService.getStudentDecks(id).subscribe((decks: Deck[]) => {
      this.decks = [...decks];
    })
  }

  public openEditModal(deck: Deck): void {
    const data = {
      ...deck,
      methods: {
        approveHandler: this.editDeck.bind(this)
      }
    };

    this.modalService.openModal({ component: DeckModalComponent, data });
  }

  public editDeck(deck: Deck): void {
    this.apiService.editDeck(deck).subscribe((editedDeck: Deck) => {
      this.decks = this.decks.map((deck: Deck) => (deck.id === editedDeck.id ? editedDeck : deck))
    });
  }

  public deleteDeck(id: string): void {
    this.apiService.deleteDeck(id).subscribe((deletedDeck: Deck) => {
      this.decks = this.decks.filter((deck: Deck) => deck.id !== deletedDeck.id);
    });
  }

  public navigateTo(path: string[]): void {
    this.router.navigate(path);
  }
}
