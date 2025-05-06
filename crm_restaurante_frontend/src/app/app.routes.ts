import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/users/register/register.component';
import { LoginComponent } from './pages/users/Login/login.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
