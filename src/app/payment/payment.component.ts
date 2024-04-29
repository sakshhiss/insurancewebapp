import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment.service';
import { AuthService } from '../auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  readonly paymentAPIUrl: string = 'https://localhost:7265/api/PaymentDetail';
  data: any = [];
  isEdit: boolean = false;

  form: any = {
    cardOwnerName: '',
    cardNumber: '',
    securityCode: null,
    validThrough: '',
    userId: this.authService.getUserId(),
  };

  constructor(
    private http: HttpClient,
    private paymentService: PaymentService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPaymentMethodsByUserId();
  }

  getPaymentMethodsByUserId(): void {
    this.paymentService.getPaymentMethods().subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        console.error('Error fetching payment methods:', error);
      }
    );
  }

  deletePayment(paymentId: number): void {
    this.http.delete(`${this.paymentAPIUrl}/${paymentId}`).subscribe(() => {
      this.paymentService.getPaymentMethods();
      this.toastr.success('Payment deleted successfully!');
    });
  }

  editToggle(paymentId: number) {
    const selectedPayment = this.data.find(
      (item: any) => item.paymentId === paymentId
    );

    if (!this.isEdit) {
      this.form = {
        ...this.form,
        paymentId: selectedPayment.paymentId,
        cardOwnerName: selectedPayment.cardOwnerName,
        cardNumber: selectedPayment.cardNumber,
        securityCode: selectedPayment.securityCode,
        validThrough: selectedPayment.validThrough,
        userId: selectedPayment.userId,
      };
      this.isEdit = true;
    } else {
      this.resetForm();
    }
  }

  resetForm() {
    this.form = {
      cardOwnerName: '',
      cardNumber: '',
      securityCode: null,
      validThrough: '',
      userId: null,
    };
    this.isEdit = false;
  }

  submit() {
    if (
      !this.form.cardOwnerName ||
      !this.form.cardNumber ||
      !this.form.securityCode
    ) {
      this.toastr.error('Please fill necessary fields');
      this.resetForm();
      return;
    }

    const request = this.isEdit
      ? this.http.put<any>(
          `${this.paymentAPIUrl}/${this.authService.getUserId()}`,
          this.form
        )
      : this.http.post(this.paymentAPIUrl, this.form);

    request.subscribe(() => {
      const message = this.isEdit ? 'updated' : 'added';
      this.resetForm();
      this.toastr.success('Data added successfully!');

      const userId = this.authService.getUserId(); 
      this.paymentService.getPaymentMethods(); 
    });
  }
}
