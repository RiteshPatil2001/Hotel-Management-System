import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-booking-details-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './bookingdetailsmodal.component.html',
  styleUrls: ['./bookingdetailsmodal.component.scss'],
})
export class BookingdetailsmodalComponent implements OnInit {
  formattedCheckIn!: string;
  formattedCheckOut!: string;
  totalBill!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Customer,
    private dialogRef: MatDialogRef<BookingdetailsmodalComponent>
  ) {}

  ngOnInit(): void {
    const pipe = new DatePipe('en-IN');
    this.formattedCheckIn = pipe.transform(this.data.checkInDate, 'dd MMM yyyy - hh:mm a', 'Asia/Kolkata')!;
    if (this.data.checkOutDate)
      this.formattedCheckOut = pipe.transform(this.data.checkOutDate, 'dd MMM yyyy - hh:mm a', 'Asia/Kolkata')!;

    if (this.data.checkOutDate && this.data.checkInDate) {
      const checkIn = new Date(this.data.checkInDate);
      const checkOut = new Date(this.data.checkOutDate);
      const diff = Math.floor((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) || 1;
      this.totalBill = diff * this.data.perDayBill;
    } else {
      this.totalBill = this.data.perDayBill;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}

