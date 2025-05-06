import { Routes } from '@angular/router';
import { ListaMenuComponent } from './pages/menus/lista-menu/lista-menu.component';


import { RegisterComponent } from './pages/users/register/register.component';
import { LoginComponent } from './pages/users/Login/login.component';

export const routes: Routes = [
    { path: '', component: ListaMenuComponent },
    { path: 'menu', component: ListaMenuComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
