import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Review } from '../../interfaces/review.interface';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews-display',
  imports: [CommonModule],
  templateUrl: './reviews-display.component.html',
  styleUrl: './reviews-display.component.css',
})
export class ReviewsDisplayComponent {
  @ViewChild('reviewsSection', { static: false }) reviewsSection!: ElementRef;

  arrReviews: Review[] = [];

  reviewService = inject(ReviewService);

  async ngOnInit() {
    this.arrReviews = await this.reviewService.getAll();
  }

  //desplazadores del contenedor
  //behavior: desplazamiento animado, no instantaneo
  scrollLeft() {
    const section = this.reviewsSection.nativeElement;
    if (section.scrollLeft === 0) {
      section.scrollLeft = section.scrollWidth; // Ir al final
    } else {
      section.scrollBy({ left: -section.offsetWidth, behavior: 'smooth' });
    }
  }

  scrollRight() {
    const section = this.reviewsSection.nativeElement;
    if (section.scrollLeft + section.clientWidth >= section.scrollWidth) {
      section.scrollLeft = 0; // Ir al principio
    } else {
      section.scrollBy({ left: section.offsetWidth, behavior: 'smooth' });
    }
  }

  //mostrar botones si existen mas de 5 elementos
  showLeftButton(): boolean {
    const section = this.reviewsSection?.nativeElement;
    return section ? section.scrollLeft > 0 : false;
  }

  showRightButton(): boolean {
    const section = this.reviewsSection?.nativeElement;
    return section
      ? section.scrollWidth - section.scrollLeft > section.clientWidth + 1
      : false;
  }
}
