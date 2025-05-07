import { Component, inject, Input } from '@angular/core';
import { TablesService } from '../../../services/tables.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Table } from '../../../interfaces/table.interface';

@Component({
  selector: 'app-edit-table',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-table.component.html',
  styleUrl: './edit-table.component.css'
})
export class EditTableComponent {

  @Input() idTable: number = 0;
  
  tableService = inject(TablesService);
  router = inject(Router);

  tableForm: FormGroup = new FormGroup({
    num_table: new FormControl(),
    capacity: new FormControl(),
  });

  tableToEdit: Table = {
    id: 0,
    capacity: 0,
    num_table: 0,
  };

  async ngOnInit() {
    this.tableToEdit = await this.tableService.getTableById(this.idTable);
    console.log(this.tableToEdit)
    
    this.tableForm.setValue({
      num_table: this.tableToEdit.num_table,
      capacity: this.tableToEdit.capacity,
    });
  
  };

  async onSubmit() {
    try {
      const response = await this.tableService.editTable(this.tableForm.value);
      alert('Mesa actualizada')
      this.router.navigateByUrl('/tables')
    } catch (error) {
      alert(error);
    }
  }
}
