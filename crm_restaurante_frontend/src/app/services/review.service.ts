import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Review } from '../interfaces/review.interface';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl: string =
    'https://backcrmrestaurante-production.up.railway.app/api/reviews';
  private httpClient = inject(HttpClient);

  getAll() {
    return lastValueFrom(this.httpClient.get<Review[]>(this.baseUrl));
  }

  post(body: Review) {
    return lastValueFrom(
      this.httpClient.post<Review>(`${this.baseUrl}/`, body)
    );
  }
}
