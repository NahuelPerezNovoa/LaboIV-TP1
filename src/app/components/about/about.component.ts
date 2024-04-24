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

  constructor(private router: Router) {}

  goTo(path: string):void{
    this.router.navigate([path]);
  }

  cerrarSesion():void{
    localStorage.removeItem("Tp1UsuarioLogueado");
    this.goTo('/login');
  }
}
