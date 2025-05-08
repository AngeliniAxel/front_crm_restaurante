import { Component, inject } from '@angular/core';
import { Table } from '../../../interfaces/table.interface';
import { TablesService } from '../../../services/tables.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  imports: [],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css',
})
export class TablesComponent {
  arrTables: Table[] = [];

  router = inject(Router);

  tableService = inject(TablesService);

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
    const response = await this.tableService.deleteTable(id);
    this.arrTables = await this.tableService.getAll();
  }
}
