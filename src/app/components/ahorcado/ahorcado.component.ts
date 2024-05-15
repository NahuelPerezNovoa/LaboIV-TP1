import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss'
})
export class AhorcadoComponent {
  alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  words: string[] = ["espantar", "conjunto", "economicamente", "reivindicacion", "extremadamente","alargar", "sesenta", "arabe", 
  "tulipan", "hijo", "silla", "harina", "abeja", "sol", "mar", "luna", "montaña", "amor", "corazon", "libro", "tiempo", "casa", 
  "noche", "dia", "amigo", "playa", "cielo", "flor", "agua", "fuego", "aire", "tierra", "verde", "rojo", "azul", "amarillo",
  "naranja", "blanco", "negro", "gris", "musica", "arte", "vida", "muerte", "familia", "trabajo", "viaje", "sueño", "esperanza"
  ];
  word = this.getNewWord();
  guessedLetters: string[] = [];
  rightWordsCounter = 0;
  attempts = 6;

  guessLetter(letter: string) {
    this.guessedLetters.push(letter);
    if (!this.word.includes(letter)) {
      this.attempts--;
    }
    const button = document.getElementById('letter-'+letter) as HTMLElement;
    button.style.visibility = 'hidden';
    if(this.attempts == 0){
      this.mostrarNotificacion();
    }
  }

  getNewWord() {
    return this.words[Math.floor(Math.random() * this.words.length)].toUpperCase();
  }

  getDisplayWord() {
    let display = '';
    for (let letter of this.word) {
      display += this.guessedLetters.includes(letter) ? letter : '_';
    }
    if(!display.includes('_')){
      const nextButton = document.getElementById('next') as HTMLElement;
      nextButton.style.visibility = 'visible';
      const alphabetContainer = document.getElementById('alphabet-container') as HTMLElement;
      alphabetContainer.style.visibility = 'hidden';
    }
    return display;
  }

  resetWord() {
    this.attempts = 6
    this.guessedLetters = [];
    this.word = this.getNewWord();
    const alphabetContainer = document.getElementById('alphabet-container') as HTMLElement;
    alphabetContainer.style.visibility = 'visible';
    for (let index = 0; index < this.alphabet.length; index++) {
      const button = document.getElementById('letter-'+this.alphabet[index]) as HTMLElement;
      button.style.visibility = 'visible';
    }
  }

  resetGame() {
    this.rightWordsCounter = 0;
    this.resetWord();
  }

  mostrarNotificacion() {
    const notificationElement = document.querySelector('.notification') as HTMLElement;
    notificationElement.style.visibility = 'visible';
  }

  esconderNotificacion() {
    const notificationElement = document.querySelector('.notification') as HTMLElement;
    notificationElement.style.visibility = 'hidden';
    this.resetGame();
  }

  siguienteClick(){
    const nextButton = document.getElementById('next') as HTMLElement;
    nextButton.style.visibility = 'hidden';
    this.rightWordsCounter ++;
    this.resetWord();
  }
}
