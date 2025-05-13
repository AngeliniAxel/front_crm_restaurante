import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuInterface } from '../../../interfaces/menu.interface';
import { MenuService } from '../../../services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Notyf } from 'notyf';

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
  notyf: Notyf;
  router = inject(Router);

  selectedId: number = 0;

  menuForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    firsts: new FormControl(),
    seconds: new FormControl(),
    desserts: new FormControl(),
    price: new FormControl(),
    day_of_week: new FormControl(),
  });

  constructor() {
    this.notyf = new Notyf();
  }

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
        name: menu.name,
        firsts: menu.firsts,
        seconds: menu.seconds,
        desserts: menu.desserts,
        price: menu.price,
      });
    } catch (error) {
      console.error('Error al cargar el menú:', error);
    }
  }

  onChange(event: Event) {
    const selectedId = Number((event.target as HTMLSelectElement).value);
    console.log('ID seleccionado:', selectedId);
    this.selectedId = Number(selectedId);

    if (selectedId) {
      this.loadMenuById(selectedId);
      // Llama al método para cargar los datos del menú
    } else {
      console.error('No se seleccionó un ID válido.');
    }
  }

  async onSubmit() {
    try {
      const menuId = this.selectedId;

      const menuData = this.menuForm.value;
      console.log('Datos del formulario:', menuData);

      if (!menuId) {
        console.error('El ID del menú es nulo o indefinido.');
        this.notyf.error('Seleccione un día para actualizar');
        return;
      }

      const updatedMenu = await this.menuService.updateMenu(menuId, menuData); // Llama al servicio
      this.notyf.success({
        message: 'Menú actualizado con éxito',
        background: '#a68358',
      });
      this.router.navigateByUrl('/menu');
      console.log('Menú actualizado con éxito:', updatedMenu);
    } catch (error) {
      console.error('Error al actualizar el menú:', error);
      this.notyf.error('Error al actualizar el menú');
    }
  }

  //resize textarea para introducir el menu
  adjustTextareaHeight(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Restablece la altura para recalcular
    textarea.style.height = `${textarea.scrollHeight}px`; // Ajusta la altura al contenido
  }
}
