import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CheckoutmodalComponent } from '../checkoutmodal/checkoutmodal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Customer } from '../../models/customer.model';
import { MatIconModule } from '@angular/material/icon';
import { BookingdetailsmodalComponent } from '../bookingdetailsmodal/bookingdetailsmodal.component';

@Component({
  selector: 'app-bookinglist',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatTooltipModule, MatIconModule],
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.scss']
})
export class BookinglistComponent {
  @Input() customerData!: Customer;

  constructor(private dialog: MatDialog) {}

  formatedCheckInDateTime!: String;

  ngOnInit() {
    const pipe = new DatePipe('en-IN');
    this.formatedCheckInDateTime = pipe.transform(this.customerData.checkInDate, 'dd MMM yyyy - hh:mm a', 'Asia/Kolkata')!;

  }

  openCheckoutModal() {
    this.dialog.open(CheckoutmodalComponent, {
      data: this.customerData,
    });
  }

  openViewModal() {
      this.dialog.open(BookingdetailsmodalComponent, {
        data: this.customerData,
    });
  }
}
