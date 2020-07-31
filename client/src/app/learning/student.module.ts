import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Routes, RouterModule } from '@angular/router';

import { CardsComponent } from './cards/cards.component';
import { CardModalComponent } from './modals/card-modal/card-modal.component';
import { CreateDeckComponent } from './create-deck/create-deck.component';
import { DecksComponent } from './decks/decks.component';
import { DeckModalComponent } from './modals/deck-modal/deck-modal.component';
import { HeaderComponent } from './header/header.component';
import { StudentComponent } from './student/student.component';
import { LearningComponent } from './learning/learning.component';
import { ModalModule } from '../shared/modal/modal.module';
import { FlipCardComponent } from './flip-card/flip-card.component';

const routes: Routes = [
  { 
    path: '', 
    component: StudentComponent,
    children: [
      { path: 'create-deck', component: CreateDeckComponent },
      { path: 'decks', component: DecksComponent },
      { path: 'decks/:id', component:  CardsComponent},
      { path: 'learning/:id', component: LearningComponent }
    ]
   }
];

@NgModule({
  declarations: [
    StudentComponent, 
    HeaderComponent,
    CreateDeckComponent,
    DecksComponent,
    CardsComponent,
    CardModalComponent,
    DeckModalComponent,
    LearningComponent,
    FlipCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    ModalModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class StudentModule { }
