import { Component, HostListener, inject } from '@angular/core';
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
  isScrolled: boolean = false; // Tracks if the page is scrolled
  isHomeRoute = false;

  ngOnInit(): void {
    // Detect if the current route is 'home'
    this.router.events.subscribe(() => {
      this.isHomeRoute = this.router.url === '/';
    });
  }

  onCLickLogout() {
    localStorage.removeItem('restaurant_token');
    this.router.navigateByUrl('/');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollTop > 0; // Set to true if scrolled, false otherwise
  }
}
