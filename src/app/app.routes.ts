import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AuthComponent } from './auth/auth/auth.component';
import { UserProgressComponent } from './components/user-progress/user-progress.component';
import { CarwashDashboardComponent } from './dashboard/carwash-dashboard/carwash-dashboard.component';
import { AddCarComponent } from './components/add-car/add-car.component';
import { AllCarsComponent } from './components/all-cars/all-cars.component';
import { CarwashCarsComponent } from './components/carwash-cars/carwash-cars.component';
import { UpdateCarStatusComponent } from './components/update-car-status/update-car-status.component';
import { IndividualDashboardComponent } from './dashboard/individual-dashboard/individual-dashboard.component';

export const routes: Routes = [

    { path: 'login', component: AuthComponent },
    { path: 'register', component: AuthComponent },
    { path: 'add-car', component: AddCarComponent },
    { path: 'individual-dashboard', component: IndividualDashboardComponent },
    { path: 'carwash-dashboard', component: CarwashDashboardComponent },
    { path: 'carwash-cars', component: CarwashCarsComponent },
    { path: 'update-car-status/:id', component: UpdateCarStatusComponent },
    { path: 'all-cars', component: AllCarsComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
