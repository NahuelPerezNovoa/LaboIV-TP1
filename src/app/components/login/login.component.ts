import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, AuthErrorCodes } from 'firebase/auth';
import { LocalUserService } from '../../services/local-user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
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
  
  loguear(): void {
    if(this.mail != "" && this.contrasenia != ""){
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.mail, this.contrasenia)
        .then((userCredential) => {
          // Signed in 
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
            case AuthErrorCodes.USER_DISABLED:
              this.mostrarNotificacion('Este usuario ha sido deshabilitado.');
              break;
            case AuthErrorCodes.USER_MISMATCH:
              this.mostrarNotificacion('Usuario no encontrado.');
              break;
            case AuthErrorCodes.INVALID_PASSWORD:
              this.mostrarNotificacion('Contraseña incorrecta.');
              break;
            case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
              this.mostrarNotificacion('Usuario o contraseña incorrecta.');
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

  fastAccessClick():void {
    this.mail = "usuariodeprueba@laboratorioiv.com";
    this.contrasenia = "12345678";
  }
}
