import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuInterface } from '../../../interfaces/menu.interface';
import { MenuService } from '../../../services/menu.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-menu',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-menu.component.html',
  styleUrl: './edit-menu.component.css',
})
export class EditMenuComponent {
  arrMenus: MenuInterface[] = [];
  menuService = inject(MenuService);
  route = inject(ActivatedRoute);

  menuForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    firsts: new FormControl(),
    seconds: new FormControl(),
    desserts: new FormControl(),
    price: new FormControl(),
    day_of_week: new FormControl(),
  });

  /* ngOnInit() {
    // Obtén el ID del menú desde la URL
    const menuId = Number(this.route.snapshot.paramMap.get('id'));
    if (menuId) {
      this.loadMenuById(menuId);
    } else {
      console.error('No se proporcionó un ID de menú.');
    }
  } */

  ngOnInit() {
    this.loadMenus();

    // Obtén el ID del menú desde la URL
    const menuId = Number(this.route.snapshot.paramMap.get('id'));
    if (menuId) {
      this.loadMenuById(menuId);
    } else {
      console.error('No se proporcionó un ID de menú.');
    }
  }

  async loadMenus() {
    try {
      this.arrMenus = await this.menuService.getAll();
      console.log('Menús cargados:', this.arrMenus);
    } catch (error) {
      console.error('Error al cargar los menús:', error);
    }
  }

  async loadMenuById(menuId: number) {
    try {
      const menu = await this.menuService.getMenuById(menuId); // Asegúrate de tener este método en el servicio
      this.menuForm.patchValue({
        id: menu.id,
        name: menu.name,
        firsts: menu.firsts,
        seconds: menu.seconds,
        desserts: menu.desserts,
        price: menu.price,
        day_of_week: menu.day_of_week,
      });
    } catch (error) {
      console.error('Error al cargar el menú:', error);
    }
  }

  onChange(event: Event) {
    const selectedId = (event.target as HTMLSelectElement).value;
    console.log('ID seleccionado:', selectedId);
    this.menuForm.patchValue({ day_of_week: selectedId });
    return (this.selectedId = Number(selectedId));
  }

  selectedId: number = 0;

  async onSubmit() {
    try {
      const menuId = this.selectedId;

      const menuData = this.menuForm.value;
      console.log('Datos del formulario:', menuData);

      if (!menuId) {
        console.error('El ID del menú es nulo o indefinido.');
        return;
      }

      const updatedMenu = await this.menuService.updateMenu(menuId, menuData); // Llama al servicio
      console.log('Menú actualizado con éxito:', updatedMenu);
    } catch (error) {
      console.error('Error al actualizar el menú:', error);
    }
  }
}
