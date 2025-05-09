import { MenuService } from './../../../services/menu.service';
import { Component, inject } from '@angular/core';
import { MenuInterface } from '../../../interfaces/menu.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-menu',
  imports: [CommonModule],
  templateUrl: './lista-menu.component.html',
  styleUrl: './lista-menu.component.css',
})
export class ListaMenuComponent {
  arrMenus: MenuInterface[] = [];

  menuService = inject(MenuService);

  async ngOnInit() {
    this.arrMenus = await this.menuService.getAll();
  }

  formatTextWithLineBreaks(text: string): string {
    return text.replace(/\n/g, '<br>');
  }
}
