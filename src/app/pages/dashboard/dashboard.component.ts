import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookinglistComponent } from '../../components/bookinglist/bookinglist.component';
import { Customer } from '../../models/customer.model';
import { MatDialog } from '@angular/material/dialog';
import { CheckinmodalComponent } from '../../components/checkinmodal/checkinmodal.component';
import { BookingService } from '../../services/bookings.service';
import { RefreshService } from '../../services/refresh.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BookinglistComponent, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  bookingList: Customer[] = [];
  filteredBookings: Customer[] = [];
  searchTerm: string = '';

  constructor(
    private dialog: MatDialog,
    private bookingService: BookingService,
    private refreshService: RefreshService
  ) {}

  ngOnInit() {
    this.fetchAllBookings();
    this.refreshService.refresh$.subscribe(() => this.fetchAllBookings());
  }

  fetchAllBookings() {
    this.bookingService.getAllBookings().subscribe({
      next: (data) => {
        this.bookingList = data;
        this.filteredBookings = [...data];
      }
    });
  }

  openCheckoutModal() {
    this.dialog.open(CheckinmodalComponent);
  }

  filterBookings() {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      this.filteredBookings = [...this.bookingList];
      return;
    }

    this.filteredBookings = this.bookingList.filter((booking) => {
      const nameMatch = booking.name?.toLowerCase().includes(term);
      const idMatch = booking.customerId?.toString().includes(term);
      const roomMatch = booking.roomNumbers?.toString().includes(term);

      const formattedDate = new Date(booking.checkInDate)
        .toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
        .replace(/ /g, ' ')
        .toLowerCase();
      const dateMatch = formattedDate.includes(term);

      return nameMatch || idMatch || roomMatch || dateMatch;
    });
  }
}
