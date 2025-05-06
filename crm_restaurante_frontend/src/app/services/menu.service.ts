import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MenuInterface } from '../interfaces/menu.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private baseUrl: string = 'http://localhost:3000/api/menus';
  private httpClient = inject(HttpClient);

   getAll() {
    return lastValueFrom(
    this.httpClient.get<MenuInterface[]>(this.baseUrl)
    )  
        
  }
}
