import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer.model';
import { CheckinPayload } from '../models/checkInPayload.model';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  private baseUrl = 'http://localhost:2001/api/actions';

  constructor(private http: HttpClient) { }

  customerCheckIn(customer: CheckinPayload) {
    return this.http.post(`${this.baseUrl}/checkin`, customer);
  }

}