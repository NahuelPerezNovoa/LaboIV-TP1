import { Component } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss'
})
export class RegistrarComponent {
  usuarios!: [Usuario] | null;
  mail: string = "";
  contrasenia: string = "";
  notificacion: string = "";

  constructor(private router: Router) {}

  registrar(): void {
    if(this.mail != "" && this.contrasenia != ""){
      const nuevoUsuario: Usuario = new Usuario(this.mail,this.contrasenia);
      const strUsuarios = localStorage.getItem("Tp1Usuarios");
      this.usuarios = JSON.parse(strUsuarios!);
      
      if(this.usuarios == null || this.usuarios == undefined){
        this.usuarios = [nuevoUsuario];
        this.guardarUsuarios();
        this.guardarUsuarioLogueado(nuevoUsuario);
        this.goToHome();
      }else{
        for (let element of this.usuarios!){
          if(element.mail == nuevoUsuario.mail){
            this.mostrarNotificacion("Este mail ya está registrado. Pruebe iniciando sesión.");
            return
          }
        };        
        this.usuarios!.push(nuevoUsuario);
        this.guardarUsuarios();
        this.guardarUsuarioLogueado(nuevoUsuario);
        this.goToHome();
      }
    }else{
      this.mostrarNotificacion("Complete ambos campos");
    }
  }

  guardarUsuarios():void {
    const usuariosString = JSON.stringify(this.usuarios);
    localStorage.setItem("Tp1Usuarios", usuariosString);
  }

  guardarUsuarioLogueado(usuario: Usuario):void {
    const usuarioString = JSON.stringify(usuario);
    localStorage.setItem("Tp1UsuarioLogueado", usuarioString);
  }

  goToHome():void{
    this.router.navigate(['/home']);
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
