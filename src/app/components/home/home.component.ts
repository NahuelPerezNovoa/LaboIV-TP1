import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { Router } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  userButton:string = ""
  usuario:string | null = null

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.usuario = localStorage.getItem("Tp1UsuarioLogueado");
    if(this.usuario == null || this.usuario == undefined){
      this.userButton = UserButtonActions.Ingresar;
    }else{
      this.userButton = UserButtonActions.Salir
    }
  }

  goTo(path: string):void{
    this.router.navigate([path]);
  }

  cerrarSesion():void{
    localStorage.removeItem("Tp1UsuarioLogueado");
    this.goTo('/login');
  }

  userButtonClick():void{
    if(this.userButton == UserButtonActions.Ingresar){
      this.goTo('/login');
    }else if(this.userButton == UserButtonActions.Salir){
      this.cerrarSesion();
    }
  }  

  toggleNavbar() {
    const navbar = document.getElementById('mi-navbar') as HTMLElement;
    navbar.classList.toggle('is-active');
  }  
}

enum UserButtonActions {
  Ingresar = "Ingresar",
  Salir = "Cerrar Sesión"
}
