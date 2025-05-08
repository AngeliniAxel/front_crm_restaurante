import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { MenuLandingComponent } from '../../components/menu-landing/menu-landing.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, MenuLandingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
