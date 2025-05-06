import { Routes } from '@angular/router';
import { ListaMenuComponent } from './pages/menus/lista-menu/lista-menu.component';

export const routes: Routes = [
  { path: '', component: ListaMenuComponent },
  { path: 'menu', component: ListaMenuComponent },
];

