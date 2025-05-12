import { Component, inject, Input } from '@angular/core';
import { TablesService } from '../../../services/tables.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Table } from '../../../interfaces/table.interface';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-edit-table',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-table.component.html',
  styleUrl: './edit-table.component.css',
})
export class EditTableComponent {
  @Input() idTable: number = 0;

  tableService = inject(TablesService);
  router = inject(Router);

  notyf: Notyf;

  tableForm: FormGroup = new FormGroup({
    id: new FormControl(),
    num_table: new FormControl(),
    capacity: new FormControl(),
  });

  tableToEdit: Table = {
    id: 0,
    capacity: 0,
    num_table: 0,
  };

  constructor() {
    this.notyf = new Notyf();
  }

  async ngOnInit() {
    this.tableToEdit = await this.tableService.getTableById(this.idTable);
    console.log(this.tableToEdit);

    this.tableForm.setValue({
      id: this.idTable,
      num_table: this.tableToEdit.num_table,
      capacity: this.tableToEdit.capacity,
    });
  }

  async onSubmit() {
    try {
      const response = await this.tableService.editTable(this.tableForm.value);

      this.notyf.success({
        message: 'Mesa actualizada',
        background: '#a68358',
      });
      this.router.navigateByUrl('/tables');
    } catch (error) {
      this.notyf.error('Hubo un error al editar la mesa');
    }
  }
}
