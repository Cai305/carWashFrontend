import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CarService } from '../../car.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-individual-dashboard',
  standalone: true,
  imports: [CommonModule,MatSelectModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule, MatTableModule],
  templateUrl: './individual-dashboard.component.html',
  styleUrls: ['./individual-dashboard.component.css'],
})
export class IndividualDashboardComponent {
  cars: any[] = [];
  displayedColumns: string[] = ['licensePlate', 'status'];
  newCar = { licensePlate: '', carWashId: '' };
  carWashes: any[] = [];

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit() {
    this.loadCars();
    this.loadCarWashes();
  }

  loadCars() {
    this.carService.getMyCars().subscribe((data:any) => (this.cars = data));
  }

  loadCarWashes() {
    this.carService.getCarWashes().subscribe((data:any) => (this.carWashes = data));
  }

  addCar() {
    this.carService.addCar(this.newCar).subscribe({
      next: () => {
        this.loadCars(); // Refresh the list of cars
        this.newCar = { licensePlate: '', carWashId: '' }; // Reset the form
      },
      error: (err) => console.error('Failed to add car:', err),
    });
  }
}
