import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carwash-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatRadioModule,
  ],
  templateUrl: './carwash-dashboard.component.html',
  styleUrls: ['./carwash-dashboard.component.css'],
})
export class CarwashDashboardComponent {
  cars: any;
  customers: any;
  statusOptions = ['received', 'in-progress', 'washing', 'completed'];
  displayedColumns = ['licensePlate', 'customer', 'status', 'createdAt'];

  newCar = { licensePlate: '' };
  useExistingUser: 'existing' | 'new' = 'existing';
  selectedCustomer = '';
  newCustomer = { name: '', email: '', password: '' };

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    try {
      this.cars = await this.carService.getCarWashCars().toPromise();
      this.customers = await this.carService.getIndividuals().toPromise();
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  async addCar() {
    try {
      const carData = {
        licensePlate: this.newCar.licensePlate,
        ...(this.useExistingUser === 'existing'
          ? { ownerId: this.selectedCustomer }
          : { newUser: this.newCustomer })
      };

      await this.carService.addCarWashCar(carData).toPromise();
      this.loadData();
      this.resetForm();
    } catch (error) {
      console.error('Error adding car:', error);
    }
  }

  async updateStatus(carId: string, status: string) {
    try {
      await this.carService.updateCarStatus(carId, status).toPromise();
      this.cars = this.cars.map((car:any) =>
        car._id === carId ? { ...car, status } : car
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  private resetForm() {
    this.newCar = { licensePlate: '' };
    this.selectedCustomer = '';
    this.newCustomer = { name: '', email: '', password: '' };
  }
}



