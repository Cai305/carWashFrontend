// all-cars.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CarService } from '../../services/car.service';



@Component({
  selector: 'app-all-cars',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule],
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.scss'],
})
export class AllCarsComponent {
  cars: any[] = [];
  displayedColumns: string[] = ['licensePlate', 'status'];

  constructor(private carService: CarService) {}

  ngOnInit() {
    // this.carService.getAllCars().subscribe((data:any) => (this.cars = data));
  }
}
