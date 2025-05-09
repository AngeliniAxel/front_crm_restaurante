import { Router } from '@angular/router';
import { TablesService } from './../../../services/tables.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-table',
  imports: [ReactiveFormsModule],
  templateUrl: './new-table.component.html',
  styleUrl: './new-table.component.css',
})
export class NewTableComponent {
  tableService = inject(TablesService);
  router = inject(Router);

  tableForm: FormGroup = new FormGroup({
    num_table: new FormControl(),
    capacity: new FormControl(),
  });

  async onSubmit() {
    try {
      const response = await this.tableService.createTable(
        this.tableForm.value
      );
      alert('Mesa creada');
      this.router.navigateByUrl('/tables');
    } catch (error: any) {
      alert(error.error.message);
    }
  }
}
