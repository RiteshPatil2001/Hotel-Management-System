import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from '../../models/customer.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckOutPayload } from '../../models/checkOutPayload.model';
import { CheckOutService } from '../../services/checkout.service';
import { RefreshService } from '../../services/refresh.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-checkoutmodal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './checkoutmodal.component.html',
  styleUrls: ['./checkoutmodal.component.scss']
})
export class CheckoutmodalComponent implements OnInit {
  checkoutPayload!: CheckOutPayload;

  checkoutDateTime!: Date;
  paymentDateTime!: Date;

  formatedCheckOutDateTime!: String;
  formatedCheckInDateTime!: String;
  formatedPaymentDateTime!: String;

  selectedPaymentMethod: string = 'select';

  totalBill!: number;

  constructor(
    public dialogRef: MatDialogRef<CheckoutmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private checkOutService: CheckOutService,
    private refreshService: RefreshService
  ) {}

  ngOnInit(): void {
    const now = new Date();
    const pipe = new DatePipe('en-IN');

    this.checkoutDateTime = now;
    this.paymentDateTime = now;

    this.formatedCheckOutDateTime = pipe.transform(now, 'dd MMM yyyy - hh:mm a', 'Asia/Kolkata')!;
    this.formatedCheckInDateTime = pipe.transform(this.data.checkInDate, 'dd MMM yyyy - hh:mm a', 'Asia/Kolkata')!;
    this.formatedPaymentDateTime = pipe.transform(now, 'dd MMM yyyy - hh:mm a', 'Asia/Kolkata')!;

    const checkInDate = new Date(this.data.checkInDate);
    const diffInMs = this.checkoutDateTime.getTime() - checkInDate.getTime();
    let totalDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (totalDays <= 0) {
      totalDays = 1; // minimum 1 day charge
    }

    this.totalBill = totalDays * (this.data.perDayBill as number);

    this.checkoutPayload = {
      customerId: this.data.customerId,
      paymentMethod: '',
      roomNumbers: this.data.roomNumbers,
      paymentDateTime: this.paymentDateTime,
      checkOutDate: this.checkoutDateTime,
      totalDays: totalDays,
      totalBill: this.totalBill,
      checkout: false
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.checkoutPayload.paymentMethod = this.selectedPaymentMethod;
    this.checkoutPayload.checkout = true;

    this.checkOutService.customerCheckOut(this.checkoutPayload).subscribe({
      next: (res) => {
        this.refreshService.triggerRefresh();
        this.dialogRef.close()
      },
      error: (err) => {
        console.error('Check-in failed', err);
      }
    });
  }
}
