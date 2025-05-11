import { TablesService } from './../../services/tables.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { Table } from '../../interfaces/table.interface';
import { StepsModule } from 'primeng/steps';

@Component({
  selector: 'app-reservations',
  imports: [DatePickerModule, ReactiveFormsModule, StepsModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
})
export class ReservationsComponent {
  // Services
  tablesService = inject(TablesService);

  // Stepper
  items = [
    { label: 'Datos reserva' },
    { label: 'Horario' },
    { label: 'Confirmar' },
  ];
  active: number = 0;

  // Form
  dateForm: FormGroup = new FormGroup({
    date: new FormControl(),
    num_guests: new FormControl(),
  });

  // Data
  arrTables: Table[] = [];
  formattedDate: string = '';

  // Stepper navigation
  next() {
    if (this.dateForm.valid) {
      this.formattedDate = this.formatDateToSql(
        this.dateForm.get('date')?.value
      );
      console.log(this.formattedDate);
      this.active++;
    }
  }

  prev() {
    this.active--;
  }

  // Confirm reservation (to be implemented)
  confirm() {}

  // Utility: format date to SQL string
  formatDateToSql(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Example: fetch tables by capacity
  async onSubmit() {
    console.log(this.dateForm.get('num_guests')?.value);
    this.arrTables = await this.tablesService.getByCapacity(
      this.dateForm.get('num_guests')?.value
    );
    console.log(this.arrTables);
  }
}
