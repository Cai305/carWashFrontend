// car.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiUrl = 'https://carwash-1.onrender.com/api';

  constructor(private http: HttpClient) {}

  addCar(car: { licensePlate: string; carWashId: string }) {
    return this.http.post(`${this.apiUrl}/cars`, car);
  }

  getMyCars() {
    return this.http.get(`${this.apiUrl}/my-cars`);
  }

  getCarWashes() {
    return this.http.get(`${this.apiUrl}/carwashes`);
  }

  getCarWashCars() {
    return this.http.get(`${this.apiUrl}/carwash/cars`);
  }

  updateCarStatus(carId: string, status: string) {
    return this.http.patch(`${this.apiUrl}/carwash/cars/${carId}`, { status });
  }
}
