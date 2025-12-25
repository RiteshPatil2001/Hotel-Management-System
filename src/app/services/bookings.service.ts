import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:2001/api/bookings';

  constructor(private http: HttpClient) { }

  getAllBookings(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/active`);
  }

  getHistoyBookings(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/history`);
  }
}
