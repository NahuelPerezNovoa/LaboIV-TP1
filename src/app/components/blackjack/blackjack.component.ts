import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/Card';
import { CardsService } from '../../services/cards.service';
import { sum } from 'firebase/firestore';

@Component({
  selector: 'app-blackjack',
  standalone: true,
  imports: [],
  templateUrl: './blackjack.component.html',
  styleUrl: './blackjack.component.scss'
})
export class BlackjackComponent implements OnInit {

  points: number = 0;
  isPlaying = false;
  startImage = "../../../assets/blackjack.jpg";
  images = [this.startImage];
  sumaTotal = 0;
  restartHand = false;
  deck: string | null = null;

  constructor(private cardService: CardsService){}

  ngOnInit(): void {
    this.toggleMode(this.isPlaying);
  }

  play(option:string){
    this.cardService.getCard(this.deck).subscribe(response => {
      if(this.deck == null) this.deck = response.deck_id;
      const newCard = response.cards[0];
      switch(option){
        case playOptions.Nuevo:
          this.isPlaying = true;
          if(!this.restartHand) this.points = 0;
          this.sumaTotal = 0;
          this.sumaTotal += (+this.getNumberValue(newCard.value)!);
          this.images = [];
          break;
        case playOptions.Otra:
          this.sumaTotal += (+this.getNumberValue(newCard.value)!);
          if(this.sumaTotal > 21){
            this.restartHand = false;
            this.isPlaying = false;
            this.deck = null;
          }
          break;
        case playOptions.Fuera:
          this.sumaTotal += (+this.getNumberValue(newCard.value)!);
          if(this.sumaTotal > 21){
            this.restartHand = true;
            this.points++;
            this.isPlaying = false
            this.deck = null;
          }else {
            this.restartHand = false;
            this.isPlaying = false;
            this.deck = null;
          }
          break;
      }
      console.log("sumaTotal: "+this.sumaTotal);
      this.toggleMode(this.isPlaying);
      this.images.push(newCard.image);
    })
  }

  private toggleMode(isPlaying: boolean){
    const playButtons = document.getElementById('play-buttons') as HTMLElement;
    const startButton = document.getElementById('start-button') as HTMLElement;
    if(isPlaying){
      playButtons.style.visibility = 'visible';
      startButton.style.visibility = 'hidden';
    }else{
      startButton.style.visibility = 'visible';
      playButtons.style.visibility = 'hidden';
    }
  }

  private getNumberValue(value: string | undefined ): string | undefined {
    switch(value){
      case 'ACE': return '1';
      case 'JACK': return '11';
      case 'QUEEN': return '12';
      case 'KING': return '13';
      default: return value;
    } 
  }

  getBoardColor(): string{
    if(this.isPlaying) {
      return 'color : cornflowerblue';
    }
    else{
      if(this.restartHand){
        return 'color : green';
      }else{
        return 'color : red';
      }
    } 
  }


}

enum playOptions {
Otra = "Otra",
Fuera = "Fuera",
Nuevo = 'Nuevo'
}
