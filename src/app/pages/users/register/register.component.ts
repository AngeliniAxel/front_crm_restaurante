import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userService = inject(UserService);
  router = inject(Router);
  notyf: Notyf;

  constructor() {
    this.notyf = new Notyf();
  }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/), // Al menos una minúscula, una mayúscula y un número
    ]),
  });

  checkError(field: string, validator: string): boolean | undefined {
    return (
      this.registerForm.get(field)?.hasError(validator) &&
      this.registerForm.get(field)?.touched
    );
  }

  async onSubmit() {
    try {
      const newUser = await this.userService.register(this.registerForm.value);
      this.notyf.success({
        message: 'registro correcto',
        background: '#a68358',
      });
      this.router.navigateByUrl('/login');
    } catch (error: any) {
      this.notyf.error(error.error.message);
    }
  }
}
