import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { lastValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

type LoginBody = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
  token: string;
};

type decodedToken = {
  id: number;
  name: string;
  role: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = 'http://localhost:3000/api/users';
  private httpClient = inject(HttpClient);

  register(body: User) {
    return lastValueFrom(
      this.httpClient.post<User>(`${this.baseUrl}/register`, body)
    );
  }

  login(body: LoginBody) {
    return lastValueFrom(
      this.httpClient.post<LoginResponse>(`${this.baseUrl}/login`, body)
    );
  }

  isLogged() {
    if (localStorage.getItem('restaurant_token')) return true;

    return false;
  }

  getUserName(): string {
    if (!this.isLogged) {
      return 'No hay usuario logueado';
    }
    const token = localStorage.getItem('restaurant_token');

    if (!token) {
      return 'No hay usuario logueado';
    }

    const decoded = jwtDecode(token) as decodedToken;

    return decoded.name;
  }

  isAdmin() {
    const token = localStorage.getItem('restaurant_token');

    if (!token) {
      return false;
    }

    const decoded = jwtDecode(token) as decodedToken;

    if (decoded.role !== 'admin') {
      return false;
    }

    return true;
  }
}
