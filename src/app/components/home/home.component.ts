import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  mensaje:String = ""

  constructor(private router: Router) {}

  ngOnInit(): void {
    const strUsuario = localStorage.getItem("Tp1UsuarioLogueado");
    const usuario: Usuario = JSON.parse(strUsuario!);
    if(usuario == null || usuario == undefined){
      this.goTo('/login');
    }
    this.mensaje = "Bienvenido "+usuario.mail;
  }

  goTo(path: string):void{
    this.router.navigate([path]);
  }

  

  cerrarSesion():void{
    localStorage.removeItem("Tp1UsuarioLogueado");
    this.goTo('/login');
  }

}
