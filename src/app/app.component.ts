import { Component, OnInit, inject } from '@angular/core';
import { EventType, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LocalUserService } from './services/local-user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  localUserService = inject(LocalUserService);
  
  userButton:string = ""
  usuario:string | null = this.localUserService.localUser;


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe( event =>
      {
        if(event.type == EventType.NavigationEnd){
          this.usuario = this.localUserService.localUser;
          this.updateUserButtonState();
        }
      }
  )
    this.updateUserButtonState();
  }

  goTo(path: string):void{
    this.router.navigate([path]);
  }

  cerrarSesion():void{
    this.localUserService.removeActualUser();
    this.goTo('/login');
  }

  updateUserButtonState(){
    if(this.usuario == null || this.usuario == undefined){
      this.userButton = UserButtonActions.Ingresar;
    }else{
      this.userButton = UserButtonActions.Salir
    }
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