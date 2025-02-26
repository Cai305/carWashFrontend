import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CarWashService } from '../../services/car-wash.service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-user-progress',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './user-progress.component.html',
  styleUrl: './user-progress.component.css'
})
export class UserProgressComponent {
getProgressPercentage(): unknown {
throw new Error('Method not implemented.');
}
  carStatus: any;
  currentUser:any;

  constructor(
    private carWashService: CarWashService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadStatus();
  }

  loadStatus() {
    this.carWashService.getCarStatus(this.currentUser.email).subscribe(status => {
      this.carStatus = status;
    });
  }
}
