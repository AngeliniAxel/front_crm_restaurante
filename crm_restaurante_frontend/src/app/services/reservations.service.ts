import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Reservation } from '../interfaces/reservation.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservationsService {
  private baseUrl: string =
    'https://backcrmrestaurante-production.up.railway.app/api/reservations';
  private httpClient = inject(HttpClient);

  createTable(body: Reservation) {
    return lastValueFrom(this.httpClient.post<Reservation>(this.baseUrl, body));
  }
}
