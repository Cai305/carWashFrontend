import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CarService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}


  addCarWashCar(carData: any) {
    return this.http.post(`${this.apiUrl}/carwash/cars`, carData, this.getHeaders());
  }

  getCarWashCars() {
    return this.http.get(`${this.apiUrl}/carwash/cars`, this.getHeaders());
  }

  updateCarStatus(carId: string, status: string) {
    return this.http.patch(`${this.apiUrl}/carwash/cars/${carId}`, { status }, this.getHeaders());
  }

  getIndividuals() {
    return this.http.get(`${this.apiUrl}/users?type=individual`, this.getHeaders());
  }




    // Add a car (for individual users)
  addCar(car: { licensePlate: string; carWashId: string ; user_id:string}) {
    const token = localStorage.getItem('token');
    return this.http.post(`${this.apiUrl}/cars`, car, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  // Get cars for the logged-in individual
  getMyCars1() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/my-cars`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  getMyCars() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    let user_id : any;
    if(user != null){
      user_id = JSON.parse(user);

      console.log("user_id : ",user_id._id)


    }



    return this.http.get(`${this.apiUrl}/my-cars/${user_id._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }



  // Get all car washes
  getCarWashes() {
    const token = localStorage.getItem('token');
    return this.http.get(`${this.apiUrl}/carwashes`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  private getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    };
  }
}
