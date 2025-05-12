import { Component, inject } from '@angular/core';

import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ReviewService } from '../../services/review.service';
import { ReviewsDisplayComponent } from '../../components/reviews-display/reviews-display.component';
import { CommonModule } from '@angular/common';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-reviews-create',
  imports: [ReactiveFormsModule, ReviewsDisplayComponent, CommonModule],
  templateUrl: './reviews-create.component.html',
  styleUrl: './reviews-create.component.css',
})
export class ReviewsCreateComponent {
  reviewService = inject(ReviewService);
  router = inject(Router);
  notyf: Notyf;

  reviewForm: FormGroup = new FormGroup({
    message: new FormControl('', Validators.required),
    rating: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(5),
    ]),
    gender: new FormControl('', Validators.required),
  });

  constructor() {
    this.notyf = new Notyf();
  }

  async onSubmit() {
    if (this.reviewForm.invalid) {
      this.notyf.error('Por favor, completa todos los campos correctamente.');
      return;
    }
    console.log(`datos enviados:`, this.reviewForm.value);
    try {
      const newReview = await this.reviewService.post(this.reviewForm.value);
      this.notyf.success({
        message: 'Gracias por tu opinión!',
        background: '#a68358',
      });
      console.log(newReview);
      this.router.navigateByUrl('/reviews/create');
      window.location.reload();
    } catch (error) {
      this.notyf.error('Hubo un error al crear la reseña');
      console.error(error);
    }
  }

  //función para recoger el valor de rating en el form
  selectedRating() {
    return this.reviewForm.get('rating')?.value ?? 0;
  }
}
