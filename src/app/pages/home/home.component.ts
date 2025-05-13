import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { MenuLandingComponent } from '../../components/menu-landing/menu-landing.component';
import { ReviewsDisplayComponent } from '../../components/reviews-display/reviews-display.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, MenuLandingComponent, ReviewsDisplayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
