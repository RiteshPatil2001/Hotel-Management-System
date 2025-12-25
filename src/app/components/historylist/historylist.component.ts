import { Component, Input } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { BookingdetailsmodalComponent } from '../bookingdetailsmodal/bookingdetailsmodal.component';

@Component({
  selector: 'in-app-historylist',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './historylist.component.html',
  styleUrl: './historylist.component.scss'
})
export class HistorylistComponent {
  @Input() customerData!: Customer;
  formatedCheckInDateTime!: String;

  constructor(private dialog: MatDialog){}

  ngOnInit() {
    const pipe = new DatePipe('en-IN');
    this.formatedCheckInDateTime = pipe.transform(this.customerData.checkInDate, 'dd MMM yyyy - hh:mm a', 'Asia/Kolkata')!;
  }

  openViewModal() {
    this.dialog.open(BookingdetailsmodalComponent, {
      data: this.customerData,
    });
  }
}
