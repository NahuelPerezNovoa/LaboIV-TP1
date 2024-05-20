import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'about', loadComponent: () => import('./components/about/about.component').then(m => m.AboutComponent)},
    { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)},
    { path: 'registrar', loadComponent: () => import('./components/registrar/registrar.component').then(m => m.RegistrarComponent)},

    //Juegos
    { path: 'mayormenor', loadComponent: () => import('./components/mayormenor/mayormenor.component').then(m => m.MayormenorComponent)},
    { path: 'ahorcado', loadComponent: () => import('./components/ahorcado/ahorcado.component').then(m => m.AhorcadoComponent)},
    { path: 'preguntados', loadComponent: () => import('./components/preguntados/preguntados.component').then(m => m.PreguntadosComponent)},


    //Default
    { path: '**', loadComponent: () => import('./components/error/error.component').then(m => m.ErrorComponent)}
];
