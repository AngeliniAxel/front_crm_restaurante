import { Response } from './../../../../node_modules/@types/express-serve-static-core/index.d';
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
import { ReservationsService } from '../../services/reservations.service';
import { jwtDecode } from 'jwt-decode';
import { Reservation } from '../../interfaces/reservation.interface';
import { AvailableTables } from '../../interfaces/available-tables.interface';

type decodedToken = {
  id: number;
  role: string;
};
@Component({
  selector: 'app-reservations',
  imports: [DatePickerModule, ReactiveFormsModule, StepsModule, DatePipe],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
})
export class ReservationsComponent {
  // Services
  tablesService = inject(TablesService);
  reservationsService = inject(ReservationsService);

  // Data
  reservationConfirmed = false;
  formattedDate: string = '';

  // Fecha para inhabilitar el calendario en dias pasados
  tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  // Obj que tendrá los array de las mesas disponibles
  availableTables: AvailableTables = {
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

  // Form de fecha y numero de invitados
  dateForm: FormGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    num_guests: new FormControl(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(12),
    ]),
  });

  // Form para la hora
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

    // Obtengo las mesas disponibles en cada horario basandome en la cantidad de personas y la fecha seleccionada

    this.availableTables = await this.tablesService.getByAvailableTables(
      capacity,
      this.formattedDate
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

  // Confirm reservation
  async confirm() {
    const user_id = this.getUserId();

    const tablesForSelectedTime = this.getSelectedTablesByTime();

    // De todas las mesas disponibles, selecciona la de tamaño mas adecuado
    const bestTable = tablesForSelectedTime.sort(
      (a, b) => a.capacity - b.capacity
    )[0];

    const reservation: Reservation = {
      user_id: user_id,
      table_id: bestTable.id,
      reservation_date: this.formattedDate,
      reservation_time: this.timeForm.get('time')?.value,
      num_guests: this.dateForm.get('num_guests')?.value,
      special_request: '',
      status: 'confirmed',
    };

    try {
      const response = await this.reservationsService.createTable(reservation);
      this.reservationConfirmed = true;
    } catch (error: any) {
      alert(error.error.message);
    }
  }

  // Utility

  //Formatea la hora del formulario para que se adecue a mysql
  formatDateToSql(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getUserId() {
    const token = localStorage.getItem('restaurant_token')!;
    const decoded = jwtDecode(token) as decodedToken;
    return decoded.id;
  }

  // Return array de las mesas disponiles para la hora seleccionada
  getSelectedTablesByTime(): Table[] {
    const selectedTime = this.timeForm.get('time')?.value;
    switch (selectedTime) {
      case '12:00':
        return this.availableTables.at12;
      case '14:00':
        return this.availableTables.at14;
      case '20:00':
        return this.availableTables.at20;
      case '22:00':
        return this.availableTables.at22;
      default:
        return [];
    }
  }
}
