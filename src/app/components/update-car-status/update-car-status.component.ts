// update-car-status.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../../services/car.service';


@Component({
  selector: 'app-update-car-status',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatSelectModule, MatButtonModule],
  templateUrl: './update-car-status.component.html',
  styleUrls: ['./update-car-status.component.scss'],
})
export class UpdateCarStatusComponent {
  carId: string;
  status!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private carService: CarService
  ) {
    this.carId = this.route.snapshot.paramMap.get('id')!;
  }

  onSubmit() {
    this.carService.updateCarStatus(this.carId, this.status).subscribe({
      next: () => this.router.navigate(['/carwash-cars']),
      error: (err:any) => console.error('Failed to update status:', err),
    });
  }
}
