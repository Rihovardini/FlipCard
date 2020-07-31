import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/shared/services/api.service';
import { Card } from 'src/app/shared/interfaces/card';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit {
  public cards: Card[] = [];
  public currentCard: Card = null;
  public currentIndex = 0;
  
  private readonly deckId = this.route.snapshot.params.id;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCards();
  }

  public getCards(): void {
    this.apiService.getStudentCardsByDeckId(this.deckId).subscribe((response: Card[]) => {
      this.cards = response;
      this.currentCard = response[this.currentIndex];
    });
  }

  public getLeftCard(): void {
    if(this.currentIndex >= 0)
      this.currentCard = this.cards[--this.currentIndex];
  }

  public getRightCard(): void {
    if(this.currentIndex < this.cards.length)
      this.currentCard = this.cards[++this.currentIndex];
  }
}
