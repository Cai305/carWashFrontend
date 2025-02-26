// carwash-cars.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CarService } from '../../car.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-carwash-cars',
  standalone: true,
  imports: [RouterModule ,CommonModule, MatCardModule, MatTableModule],
  templateUrl: './carwash-cars.component.html',
  styleUrls: ['./carwash-cars.component.scss'],
})
export class CarwashCarsComponent {
  cars: any[] = [];
  displayedColumns: string[] = ['licensePlate', 'status', 'actions'];

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.carService.getCarWashCars().subscribe((data:any) => (this.cars = data));
  }
}
