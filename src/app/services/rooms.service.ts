import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/rooms.model';
import { MaintenanceRoomPayload } from '../models/maintenanceRoomPayload.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = 'http://localhost:2001/api/rooms';

  constructor(private http: HttpClient) { }

  // Get all available rooms
  getAvailableRooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/available`);
  }

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/all`);
  }

  getBlockedRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/blocked`)
  }

  addRoomToMaintainace(maintenanceRoom: MaintenanceRoomPayload){
    return this.http.post(`${this.baseUrl}/addroomtomaintainace`, maintenanceRoom);
  }

  removeRoomFromMaintainace(RoomNo: Number){
    return this.http.post(`${this.baseUrl}/removeroomtomaintainace`, RoomNo, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
