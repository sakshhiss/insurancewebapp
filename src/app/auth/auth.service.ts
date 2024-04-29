import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginForm } from '../types/loginform';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedValue: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(form: LoginForm): Observable<any> {
    return this.http.post<any>('https://localhost:7265/api/Login', form).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error); // Pass the error along the observable chain
      })
    );
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('userId') !== null; // Check if user ID exists in session storage
  }

  getUserId(): string | null {
    return sessionStorage.getItem('userId');
  }

  logout(): void {
    sessionStorage.removeItem('userId'); 
  }

  initAuthStateListener(): Promise<void> {
    return new Promise<void>((resolve) => {
      const userId = sessionStorage.getItem('userId') !== null;
      if (userId) {
        console.log('User is already signed in');
        this.isAuthenticatedValue = true;
      }
      resolve();
    });
  }
}
