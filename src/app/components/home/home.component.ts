import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { LocalUserService } from '../../services/local-user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  usuario:string | null = null
  notificacion: string = "";


  localUserService = inject(LocalUserService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.usuario = this.localUserService.localUser;
  }

  goTo(path: string):void{
    if(this.usuario == null){
      this.mostrarNotificacion("Logueate para acceder a los juegos!")
    }else{
      this.router.navigate([path]);
    }
  }

  mostrarNotificacion(mensaje: string): void {
    this.notificacion = mensaje;
    const notificationElement = document.querySelector('.notification') as HTMLElement;
    notificationElement.style.visibility = 'visible';
  }

  esconderNotificacion(): void {
    this.notificacion = ''; 
    const notificationElement = document.querySelector('.notification') as HTMLElement;
    notificationElement.style.visibility = 'hidden';
  }
}