import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  userService = inject(UserService);
  router = inject(Router);

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  });

  async onSubmit() {
    try {
      const newUser = await this.userService.register(this.registerForm.value);
      alert('registro correcto');
      console.log(newUser);
      this.router.navigateByUrl('/login');
    } catch (error) {
      alert(error);
    }
  }
}
