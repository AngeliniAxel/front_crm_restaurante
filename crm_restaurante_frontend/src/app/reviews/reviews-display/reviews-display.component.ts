import { Component, inject } from '@angular/core';
import { Review } from '../../interfaces/review.interface';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-reviews-display',
  imports: [],
  templateUrl: './reviews-display.component.html',
  styleUrl: './reviews-display.component.css',
})
export class ReviewsDisplayComponent {
  arrReviews: Review[] = [];

  reviewService = inject(ReviewService);

  async ngOnInit() {
    this.arrReviews = await this.reviewService.getAll();
  }
}
