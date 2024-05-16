import { Component, OnInit, inject } from '@angular/core';
import { Usuario } from '../../models/Usuario';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { LocalUserService } from '../../services/local-user.service';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss'
})
export class RegistrarComponent implements OnInit {
  localUserService = inject(LocalUserService);
  mail: string = "";
  contrasenia: string = "";
  notificacion: string = "";

  constructor(private router: Router, private firestore: Firestore) {}

  ngOnInit(): void {
    const usuario = this.localUserService.localUser;
    if(usuario != null && usuario != undefined){
      this.goToHome();
    }
  }

  registrar(): void {
    if(this.mail != "" && this.contrasenia != ""){

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.mail, this.contrasenia)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          this.guardarUsuarioLogueado(user.email!);
          this.goToHome();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          switch(errorCode){
            case AuthErrorCodes.INVALID_EMAIL:
              this.mostrarNotificacion('Email inválido.');
              break;
            case AuthErrorCodes.EMAIL_EXISTS:
              this.mostrarNotificacion('Este email ya se encuentra registrado.');
              break;
            case AuthErrorCodes.OPERATION_NOT_ALLOWED:
              this.mostrarNotificacion('Operación no permitida.');
              break;
            case AuthErrorCodes.WEAK_PASSWORD:
              this.mostrarNotificacion('Contraseña débil.');
              break;
            default:
              this.mostrarNotificacion("Ha ocurrido un error al registrar. Intente de nuevo mas tarde.");
              break;
          }
        });
    }else{
      this.mostrarNotificacion("Complete ambos campos");
    }
  }

  guardarUsuarioLogueado(user: string):void {
    this.localUserService.setActualUser(user);
    //Logueo el inicio de sesion en firestore
    let col = collection(this.firestore, 'logins');
    addDoc(col,{fecha: new Date(), "user": user});
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
