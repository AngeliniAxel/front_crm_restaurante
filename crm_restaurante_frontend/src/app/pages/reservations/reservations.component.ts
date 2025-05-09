import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';


@Component({
  selector: 'app-reservations',
  imports: [DatePickerModule, ReactiveFormsModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})
export class ReservationsComponent {
  

  dateForm: FormGroup = new FormGroup({
    date: new FormControl(),
    num_guests: new FormControl()
    
  });

  onSubmit() {
    console.log(this.dateForm.value)
  }

}
