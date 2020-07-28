import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { apiUrls } from '../constants/api-urls';
import { Card } from '../interfaces/card';
import { Deck } from '../interfaces/deck';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  public logIn (email: string, password: string): Observable<any> {
    return this.httpClient.post(apiUrls.login, { email, password });
  }

  public signUp (firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return this.httpClient.post(apiUrls.singUp, { firstName, lastName, email, password });
  }

  public refreshToken (refreshToken: string): Observable<any> {
    return this.httpClient.post(apiUrls.refreshToken, { refreshToken });
  }

  public createDeck (deck: Deck): Observable<Deck> {
    return this.httpClient.post<Deck>(apiUrls.decks, deck);
  }

  public editDeck(deck: Deck): Observable<Deck> {
    return this.httpClient.put<Deck>(apiUrls.decks, deck);
  }

  public deleteDeck(id: string): Observable<Deck> {
    return this.httpClient.delete<Deck>(`${apiUrls.decks}/${id}`);
  }

  public getStudentDecks(studentId: string): Observable<Deck[]> {
    return this.httpClient.get<Deck[]>(`${apiUrls.studentDecks}/${studentId}`);
  }

  public getStudentCardsByDeckId(deckId: string): Observable<Card[]> {
    return this.httpClient.get<Card[]>(`${apiUrls.decks}/${deckId}/cards`);
  }

  public addCard(card: Card): Observable<Card> {
    return this.httpClient.post<Card>(`${apiUrls.cards}`, card);
  }

  public editCard(card: Card): Observable<Card> {
    return this.httpClient.put<Card>(`${apiUrls.cards}`, card);
  }

  public deleteCard(id: string): Observable<Card> {
    return this.httpClient.delete<Card>(`${apiUrls.cards}/${id}`);
  }
}
