import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CheckOutPayload } from '../models/checkOutPayload.model';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  private baseUrl = 'http://localhost:2001/api/actions';

  constructor(private http: HttpClient) { }

  customerCheckOut(checkoutData: CheckOutPayload) {
    return this.http.put(`${this.baseUrl}/checkout`, checkoutData);
  }

}