import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface CarStatus {
  id: string;
  status: string;
  // Add other car properties
}

@Injectable({ providedIn: 'root' })
export class CarWashService {
  private apiUrl = 'https://carwash-1.onrender.com/api'; // Update with your backend API

  constructor(private http: HttpClient) {}

  getAllCars() {
    return this.http.get<CarStatus[]>(`${this.apiUrl}/cars`);
  }

  updateCarStatus(carId: string, status: string) {
    return this.http.patch(`${this.apiUrl}/cars/${carId}`, { status });
  }

  getCarStatus(userId: string) {
    return this.http.get<CarStatus>(`${this.apiUrl}/cars/${userId}`);
  }

  getCarWashes() {
    return this.http.get(`${this.apiUrl}/carwashes`);
  }
}
