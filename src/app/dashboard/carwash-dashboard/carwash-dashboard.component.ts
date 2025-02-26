import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-carwash-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule],
  templateUrl: './carwash-dashboard.component.html',
  styleUrls: ['./carwash-dashboard.component.css'],
})
export class CarwashDashboardComponent {
  cars: any[] = [];
  displayedColumns: string[] = ['licensePlate', 'status', 'actions'];

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carService.getCarWashCars().subscribe((data:any) => (this.cars = data));
  }

  updateStatus(carId: string) {
    this.router.navigate(['/update-car-status', carId]);
  }
}
