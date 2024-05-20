import { Component, OnInit, inject } from '@angular/core';
import { FlagsService } from '../../services/flags.service';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
})
export class PreguntadosComponent implements OnInit {

  paises: any[] = [];
  startImage = "../../../assets/pregutados.jpg";
  image: string | null = this.startImage;
  dataIsLoaded = false;
  isPlaying = false;
  points = 0;

  opciones: any[] = [];
  opcionCorrecta = -1;

  constructor(private service: FlagsService){}

  ngOnInit(): void {
    this.toggleMode(this.isPlaying);
    this.service.getPaises().subscribe(paises => {
      this.paises = paises;
      this.dataIsLoaded = true
    })
  }

  play(option:string){   
    if(this.dataIsLoaded){
      switch(option){
        case playOptions.Nuevo:
          this.isPlaying = true;
          this.points = 0;
          break;
        case playOptions.A:
          if(this.opcionCorrecta == 0){
            this.points++;
          }else {
            this.isPlaying = false
            this.image = this.startImage
          }
          break;
        case playOptions.B:
          if(this.opcionCorrecta == 1){
            this.points++;
          }else {
            this.isPlaying = false
            this.image = this.startImage
          }
          break;
        case playOptions.C:
          if(this.opcionCorrecta == 2){
            this.points++;
          }else {
            this.isPlaying = false
            this.image = this.startImage
          }
          break;
      }
      if(this.isPlaying) this.setRound();
      this.toggleMode(this.isPlaying);
      this.image = this.opciones[this.opcionCorrecta].flags.png;
    }
  }

  private setRound(){
    let copiaArray = [...this.paises];
  
    for (let i = 0; i < 3; i++) {
      let indiceAleatorio = Math.floor(Math.random() * copiaArray.length);
  
      this.opciones[i] = copiaArray[indiceAleatorio];
  
      copiaArray.splice(indiceAleatorio, 1);
    }
    this.opcionCorrecta = Math.floor(Math.random() * this.opciones.length);
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
}


enum playOptions {
  A = "A",
  B = "B",
  C = "C",
  Nuevo = 'Nuevo'
}