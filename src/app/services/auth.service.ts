import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

interface User {
  email: string;
  name: string;
  type: 'individual' | 'carwash';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://carwash-1.onrender.com/api'; // Update with your backend API

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ user: User }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => localStorage.setItem('user', JSON.stringify(res.user)))
    );
  }

  register(userData: any) {
    return this.http.post<{ user: User }>(`${this.apiUrl}/register`, userData).pipe(
      tap(res => localStorage.setItem('user', JSON.stringify(res.user)))
    );
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
