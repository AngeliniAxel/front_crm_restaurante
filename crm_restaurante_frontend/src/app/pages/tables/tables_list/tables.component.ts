import { Component, inject } from '@angular/core';
import { Table } from '../../../interfaces/table.interface';
import { TablesService } from '../../../services/tables.service';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-tables',
  imports: [],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
})
export class TablesComponent {
  arrTables: Table[] = [];

  router = inject(Router);
  notyf: Notyf;

  tableService = inject(TablesService);

  constructor() {
    this.notyf = new Notyf();
  }

  async ngOnInit() {
    this.arrTables = await this.tableService.getAll();
  }

  onClick() {
    this.router.navigateByUrl('/tables/new');
  }

  editTable(id: number) {
    this.router.navigateByUrl(`/tables/${id}`);
  }

  async deleteTable(id: number) {
    try {
      const response = await this.tableService.deleteTable(id);
      this.notyf.success({
        message: 'Mesa eliminada exitosamente!',
        background: '#a68358',
      });
    } catch (error: any) {
      this.notyf.error(error.error.message);
    }
    this.arrTables = await this.tableService.getAll();
  }
}
