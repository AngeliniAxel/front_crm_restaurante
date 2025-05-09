import { TablesService } from './../../services/tables.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { Table } from '../../interfaces/table.interface';


@Component({
  selector: 'app-reservations',
  imports: [DatePickerModule, ReactiveFormsModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {

  tablesService = inject(TablesService) 
  
  arrTables: Table[] = [];

  dateForm: FormGroup = new FormGroup({
    date: new FormControl(),
    num_guests: new FormControl()
    
  });

  async onSubmit() {
    console.log(this.dateForm.get('num_guests')?.value)
    this.arrTables = await this.tablesService.getByCapacity(this.dateForm.get('num_guests')?.value)
    console.log(this.arrTables)
  }

}
