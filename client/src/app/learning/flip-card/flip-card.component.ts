import { Component, OnInit, ElementRef, ViewChild, Input  } from '@angular/core';

@Component({
  selector: 'app-flip-card',
  templateUrl: './flip-card.component.html',
  styleUrls: ['./flip-card.component.scss']
})
export class FlipCardComponent {
  @ViewChild('card') private cardElement: ElementRef;

  @Input() public term: string;
  @Input() public definition: string;

  constructor() { }

  public flipCard(): void {
    this.cardElement.nativeElement.classList.toggle('is-flipped');
  }
}
