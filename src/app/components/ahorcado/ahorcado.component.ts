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
  word = 'AHORCADO';
  guessedLetters: string[] = [];
  attempts = 0;

  guessLetter(letter: string) {
    this.guessedLetters.push(letter);
    if (!this.word.includes(letter)) {
      this.attempts++;
    }
    const button = document.getElementById('letter-'+letter) as HTMLElement;
    button.style.visibility = 'hidden';
  }

  getDisplayWord() {
    let display = '';
    for (let letter of this.word) {
      display += this.guessedLetters.includes(letter) ? letter : '_';
    }
    return display;
  }
}
