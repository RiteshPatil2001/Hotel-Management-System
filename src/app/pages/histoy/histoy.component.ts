import { Component } from '@angular/core';
import { Customer } from '../../models/customer.model';
import { BookingService } from '../../services/bookings.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { HistorylistComponent } from '../../components/historylist/historylist.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-histoy',
  standalone: true,
  imports: [MatExpansionModule, CommonModule, FormsModule, HistorylistComponent],
  templateUrl: './histoy.component.html',
  styleUrls: ['./histoy.component.scss'],
})
export class HistoyComponent {
  bookingList: Customer[] = [];
  groupedBookings: { month: string; bookings: Customer[]; date: Date }[] = [];
  filteredGroupedBookings: { month: string; bookings: Customer[]; date: Date }[] = [];

  selectedMonth: string = 'All';
  selectedClientType: string = 'All';
  monthsList: string[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.fetchHistoryBookings();
  }

  fetchHistoryBookings() {
    this.bookingService.getHistoyBookings().subscribe({
      next: (data) => {
        this.bookingList = data;
        this.groupBookingsByMonth();
        this.buildMonthList();
        this.applyFilters();
      },
    });
  }

  groupBookingsByMonth() {
    const grouped: { [key: string]: Customer[] } = {};

    this.bookingList.forEach((booking) => {
      const monthKey = new Date(booking.checkInDate).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
      });

      if (!grouped[monthKey]) grouped[monthKey] = [];
      grouped[monthKey].push(booking);
    });

    this.groupedBookings = Object.keys(grouped)
      .map((month) => ({
        month,
        bookings: grouped[month],
        date: new Date(grouped[month][0].checkInDate),
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  buildMonthList() {
    this.monthsList = this.groupedBookings.map((g) => g.month);
  }

  applyFilters() {
    let filtered = this.groupedBookings;

    if (this.selectedMonth !== 'All') {
      filtered = filtered.filter((g) => g.month === this.selectedMonth);
    }

    if (this.selectedClientType !== 'All') {
      const isForeign = this.selectedClientType === 'International';

      filtered = filtered.map((group) => ({
        ...group,
        bookings: group.bookings.filter((b) =>
          isForeign ? b.foreignClient : !b.foreignClient
        ),
      }));
    }

    this.filteredGroupedBookings = filtered.filter((g) => g.bookings.length > 0);
  }

  isAllMonthsSelected() {
    return this.selectedMonth === 'All';
  }
}
