import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { EmployeeDetail } from '../types/EmployeeDetail';
import { PolicyDetail } from '../types/PolicyDetail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  readonly employeeAPIUrl = 'https://localhost:7265/api/Dashboard/employees/';
  readonly policyAPIUrl = 'https://localhost:7265/api/Dashboard/policies/';

  empinfo: EmployeeDetail | null = null;
  policyinfo: PolicyDetail[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.getEmployeeData(userId);
      this.getPolicyData(userId);
    }
  }
  pay() {
    this.router.navigate(['/payment']);
  }
  getEmployeeData(userId: string) {
    this.http
      .get<EmployeeDetail>(`${this.employeeAPIUrl}${userId}`)
      .subscribe((data) => {
        this.empinfo = data;
      });
  }

  getPolicyData(userId: string) {
    this.http
      .get<PolicyDetail[]>(`${this.policyAPIUrl}${userId}`)
      .subscribe((data) => {
        this.policyinfo = data;
      });
  }
}
