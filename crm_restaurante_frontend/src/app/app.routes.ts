import { Routes } from '@angular/router';
import { ListaMenuComponent } from './pages/menus/lista-menu/lista-menu.component';

import { RegisterComponent } from './pages/users/register/register.component';
import { LoginComponent } from './pages/users/Login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { EditMenuComponent } from './pages/menus/edit-menu/edit-menu.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: ListaMenuComponent },
  {
    path: 'menu/edit',
    component: EditMenuComponent,
    canActivate: [adminGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
