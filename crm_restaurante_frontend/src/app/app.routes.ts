import { Routes } from '@angular/router';
import { ListaMenuComponent } from './pages/menus/lista-menu/lista-menu.component';

import { RegisterComponent } from './pages/users/register/register.component';
import { LoginComponent } from './pages/users/Login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { EditMenuComponent } from './pages/menus/edit-menu/edit-menu.component';
import { adminGuard } from './guards/admin.guard';
import { TablesComponent } from './pages/tables/tables_list/tables.component';
import { NewTableComponent } from './pages/tables/new-table/new-table.component';
import { EditTableComponent } from './pages/tables/edit-table/edit-table.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: ListaMenuComponent },
  {
    path: 'menu/edit',
    component: EditMenuComponent,
    canActivate: [adminGuard],
  },

  { path: 'tables', component: TablesComponent, canActivate: [adminGuard] },
  { path: 'tables/new', component: NewTableComponent, canActivate: [adminGuard] },
  {path: 'tables/:idTable', component: EditTableComponent, canActivate: [adminGuard]},

  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
