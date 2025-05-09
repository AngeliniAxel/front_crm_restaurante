import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { ReviewsDisplayComponent } from '../../components/reviews-display/reviews-display.component';

@Component({
  selector: 'app-reviews-create',
  imports: [ReactiveFormsModule, ReviewsDisplayComponent],
  templateUrl: './reviews-create.component.html',
  styleUrl: './reviews-create.component.css',
})
export class ReviewsCreateComponent {
  reviewService = inject(ReviewService);
  router = inject(Router);

  reviewForm: FormGroup = new FormGroup({
    message: new FormControl(),
    rating: new FormControl(),
  });

  async onSubmit() {
    try {
      const newReview = await this.reviewService.post(this.reviewForm.value);
      alert('registro correcto');
      console.log(newReview);
      this.router.navigateByUrl('/reviews/create');
    } catch (error) {
      alert(error);
    }
  }
}
