import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registrar', component: RegistrarComponent },
    //{ path: '/home/logged', loadComponent: () => import('./components/chat/chat.component').then(m => m.ChatComponent)},
    { path: '**', component: ErrorComponent },
];
