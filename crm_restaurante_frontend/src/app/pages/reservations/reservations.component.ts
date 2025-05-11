import { TablesService } from './../../services/tables.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { Table } from '../../interfaces/table.interface';
import { StepsModule } from 'primeng/steps';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reservations',
  imports: [DatePickerModule, ReactiveFormsModule, StepsModule, DatePipe],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
})
export class ReservationsComponent {
  // Services
  tablesService = inject(TablesService);

  // Data
  arrTables: Table[] = [];
  formattedDate: string = '';
  tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
  availableTables: {
    at12: Table[];
    at14: Table[];
    at20: Table[];
    at22: Table[];
  } = {
    at12: [],
    at14: [],
    at20: [],
    at22: [],
  };

  // Stepper
  items = [
    { label: 'Datos reserva' },
    { label: 'Horario' },
    { label: 'Confirmar' },
  ];
  active: number = 0;

  // Form
  dateForm: FormGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    num_guests: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(12),
    ]),
  });

  timeForm: FormGroup = new FormGroup({
    time: new FormControl(null, [Validators.required]),
  });

  checkError(field: string, validator: string): boolean | undefined {
    return (
      this.dateForm.get(field)?.hasError(validator) &&
      this.dateForm.get(field)?.touched
    );
  }

  // Stepper navigation
  async confirmDate() {
    this.formattedDate = this.formatDateToSql(this.dateForm.get('date')?.value);
    const capacity = this.dateForm.get('num_guests')?.value;

    // Obtengo las mesas en cada horario basandome en la cantidad de personas y la fecha seleccionada

    // 12
    this.availableTables.at12 = await this.tablesService.getByAvailableTables(
      capacity,
      this.formattedDate,
      '12:00'
    );

    // 14
    this.availableTables.at14 = await this.tablesService.getByAvailableTables(
      capacity,
      this.formattedDate,
      '14:00'
    );

    // 20
    this.availableTables.at20 = await this.tablesService.getByAvailableTables(
      capacity,
      this.formattedDate,
      '20:00'
    );

    // 22
    this.availableTables.at22 = await this.tablesService.getByAvailableTables(
      capacity,
      this.formattedDate,
      '22:00'
    );

    this.active++;
  }

  prev() {
    // Si se vuelve al primer paso, reset al form de la hora
    if (this.active === 1) {
      this.timeForm.setValue({
        time: null,
      });
    }
    this.active--;
  }

  confirmTime() {
    this.active++;
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
}
