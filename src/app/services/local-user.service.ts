import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalUserService {

  localUser: string | null = this.getActualUser();

  constructor() { }

  private getActualUser(){
    return localStorage.getItem("Tp1UsuarioLogueado");
  }

  setActualUser(user: string){
    localStorage.setItem("Tp1UsuarioLogueado", user);
    this.localUser = this.getActualUser();
  }

  removeActualUser(){
    localStorage.removeItem("Tp1UsuarioLogueado");
    this.localUser = this.getActualUser();
  }
}
