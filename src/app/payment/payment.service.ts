import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  readonly paymentAPIUrl = 'https://localhost:7265/api/PaymentDetail';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPaymentMethods(): Observable<any> {
    return this.http.get(
      this.paymentAPIUrl + '/' + this.authService.getUserId()
    );
  }
}
