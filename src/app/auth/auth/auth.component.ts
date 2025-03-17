import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loadingStatus = false;
  isLogin = true; // Toggle between login and register forms
  userType: 'individual' | 'carwash' = 'individual'; // Default user type for registration
  formData = {
    email: '',
    password: '',
    name: '',
    location:'',
  };

  constructor(private authService: AuthService, private router: Router) {}

  // Toggle between login and register forms
  toggleForm() {
    this.isLogin = !this.isLogin;
    this.resetForm(); // Reset the form when toggling
  }

  // Reset the form data
  resetForm() {
    this.formData = {
      email: '',
      password: '',
      name: '',
      location:'',
    };
  }

  // Handle form submission
  onSubmit() {
    if (this.isLogin) {
      this.loadingStatus = true;
      // Handle login
      this.authService.login(this.formData).subscribe({
        next: (response: any) => {
          console.log('Login successful'); // Debugging
          localStorage.setItem('token', response.token); // Save the token
          localStorage.setItem('userType', response.user.type); // Save the user type
          this.loadingStatus = false;
          // Redirect based on user type
          if (response.user.type === 'individual') {
            this.router.navigate(['/individual-dashboard']); // Redirect to individual dashboard
          } else if (response.user.type === 'carwash') {
            this.router.navigate(['/carwash-dashboard']); // Redirect to car wash dashboard
          }
        },
        error: (err) => {
          console.error('Login failed:', err); // Debugging
        },
      });
    } else {
      // Handle registration
      const registrationData = {
        ...this.formData,
        type: this.userType,
        location: this.userType === 'carwash' ? this.formData.location : undefined, // Include location for car wash users
      };

      this.authService.register(registrationData).subscribe({
        next: (response: any) => {
          console.log('Registration successful'); // Debugging
          localStorage.setItem('token', response.token); // Save the token
          localStorage.setItem('userType', response.user.type); // Save the user type
          this.loadingStatus = false;
          // Redirect based on user type
          if (response.user.type === 'individual') {
            this.router.navigate(['/individual-dashboard']); // Redirect to individual dashboard
          } else if (response.user.type === 'carwash') {
            this.router.navigate(['/carwash-dashboard']); // Redirect to car wash dashboard
          }
        },
        error: (err) => {
          console.error('Registration failed:', err); // Debugging
        },
      });
    }
  }
}
