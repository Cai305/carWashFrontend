import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-individual-dashboard',
  standalone: true,
  imports: [CommonModule, MatSelectModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule, MatTableModule],
  templateUrl: './individual-dashboard.component.html',
  styleUrls: ['./individual-dashboard.component.css'],
})
export class IndividualDashboardComponent {
  cars: any[] = []; // List of cars for the logged-in individual
  carWashes: any[] = []; // List of available car washes
  displayedColumns: string[] = ['licensePlate', 'carWash', 'status', 'createdAt']; // Table columns
  newCar = { licensePlate: '', carWashId: '' , user_id : '' }; // Form data for adding a new car
  id:any;

  constructor(private carService: CarService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    let user_id : any;
    if(user != null){
      user_id = JSON.parse(user);

      console.log("user_id : ",user_id._id)
      this.newCar.user_id = user_id._id;
      this.id =  user_id._id;

    }

    this.loadCars();
    this.loadCarWashes();

    console.log("newCar" , this.newCar)
  }

  // Load cars for the logged-in individual
  loadCars() {
    this.carService.getMyCars().subscribe({
      next: (data: any) => {
        this.cars = data;
      },
      error: (err) => {
        this.snackBar.open('Failed to load cars. Please try again.', 'Close', { duration: 3000 });
        console.error('Error loading cars:', err);
      }
    });
  }

  // Load available car washes
  loadCarWashes() {
    this.carService.getCarWashes().subscribe({
      next: (data: any) => {
        this.carWashes = data;
      },
      error: (err) => {
        this.snackBar.open('Failed to load car washes. Please try again.', 'Close', { duration: 3000 });
        console.error('Error loading car washes:', err);
      }
    });
  }

  // Add a new car
  addCar() {

    console.log(this.newCar);

    if (!this.newCar.licensePlate || !this.newCar.carWashId) {
      this.snackBar.open('Please fill in all fields.', 'Close', { duration: 3000 });
      return;
    }

    this.carService.addCar(this.newCar).subscribe({
      next: (response: any) => {
        this.snackBar.open('Car added successfully!', 'Close', { duration: 3000 });
        this.loadCars(); // Refresh the list of cars
        this.newCar = { licensePlate: '', carWashId: '' , user_id:this.id}; // Reset the form
      },
      error: (err) => {
        this.snackBar.open('Failed to add car. Please try again.', 'Close', { duration: 3000 });
        console.error('Error adding car:', err);
      }
    });
  }

}
