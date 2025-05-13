import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userService = inject(UserService);
  router = inject(Router);
  notyf: Notyf;

  constructor() {
    this.notyf = new Notyf();
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(20),
    ]),
  });

  checkError(field: string, validator: string): boolean | undefined {
    return (
      this.loginForm.get(field)?.hasError(validator) &&
      this.loginForm.get(field)?.touched
    );
  }

  async onSubmit() {
    try {
      const response = await this.userService.login(this.loginForm.value);
      localStorage.setItem('restaurant_token', response.token);
      this.router.navigateByUrl('/');
    } catch (error: any) {
      this.notyf.error(error.error.message);
    }
  }
}
