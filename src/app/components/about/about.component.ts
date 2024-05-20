import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  descripcionMia = "Hola, soy Nahuel Pérez Novoa. Soy desarrollador mobile con 2 años de experiencia laboral, pero realmente me cuesta bastante web. Aún asi, aca estamos, poniendole onda!"

  descripcionJuego = "Mi juego es un falso BlackJack en el cual, como en el juego original, se busca acercarse lo mas posible a 21, pero sin pasarse.<br> En este caso, el jugador pedirá cartas mientras lo considere y al llegar lo mas cerca que se anime de 21, apretará el botón ESTOY FUERA.<br> Si la siguiente carta lo mantenía en 21 o menos, el jugador pierde, pero en cambio, si la siguiente carta lo hacía pasarse de los 21, el jugador suma un punto y sigue jugando."
  
  constructor(private router: Router) {}
}
