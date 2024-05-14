import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { DeckResponse } from '../models/Card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  http = inject(HttpClient);

  constructor() { }

  getCard() {
    return this.http.get<DeckResponse>('https://www.deckofcardsapi.com/api/deck/new/draw/?count=1')
  }
  
}
