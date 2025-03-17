// add-car.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';


@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss'],
})
export class AddCarComponent {
  car = { licensePlate: '', carWashId: '', user_id:''};
  carWashes: any[] = [];

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit() {
    this.carService.getCarWashes().subscribe((data:any) => (this.carWashes = data));
    const user = localStorage.getItem('user');
    let user_id : any;
    if(user != null){
      user_id = JSON.parse(user);

      console.log("user_id : ",user_id._id)
      this.car.user_id = user_id._id;

    }
  }

  onSubmit() {
    this.carService.addCar(this.car).subscribe({
      next: () => this.router.navigate(['/carwash-cars']),
      error: (err:any) => console.error('Failed to add car:', err),
    });
  }
}
