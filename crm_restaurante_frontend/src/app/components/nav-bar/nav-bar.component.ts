import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  router = inject(Router);
  userService = inject(UserService);

  onCLickLogout() {
    localStorage.removeItem('restaurant_token');
    this.router.navigateByUrl('/login');
  }
}
