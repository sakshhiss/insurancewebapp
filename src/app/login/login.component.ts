import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { LoginForm } from '../types/loginform';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: LoginForm = {
    email: '',
    password: '',
  };
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  submit() {
    this.isLoading = true;
    this.authService.login(this.form).subscribe(
      (response) => {
        // Authentication successful
        sessionStorage.setItem('userId', response.userId);
        // Show success message or redirect to dashboard
        this.toastr.success('Logged in successfully!');
        // Redirect to the dashboard after a delay
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      (error) => {
        // Authentication failed, handle error
        if (error.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        this.isLoading = false;
      }
    );
  }
}
