import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RoomService } from '../../services/rooms.service';
import { Room } from '../../models/rooms.model';
import { MaintenanceRoomPayload } from '../../models/maintenanceRoomPayload.model';
import { RefreshService } from '../../services/refresh.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTooltipModule, MatIconModule],
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss']
})
export class AvailabilityComponent {
  floorItems: { floor: string; rooms: { number: number; status: string; maintaince: string }[] }[] = [];
  allRooms: Room[] = [];
  selectedStatus = 'All';

  // Menu and Form control
  showManageMenu = false;
  showAddForm = false;
  showRemoveForm = false;

  maintenanceForm: MaintenanceRoomPayload = { roomNumber: null, reason: '' };
  maintenanceRecords: {roomNumber: number}[] = [];
  availableRooms: {roomNumber: number}[] = [];
  selectedRoomForRemoval: number = 0;

  constructor(
    private roomService: RoomService,
    private refreshService: RefreshService
  ) {}

  ngOnInit() {
    this.fetchAllRooms();
    this.fetchBlockedRooms();
    this.fetchAvailableRooms();

  this.refreshService.refresh$.subscribe(() => {
    console.log('🔄 Refresh triggered - reloading rooms');
    this.fetchAllRooms();
    this.fetchBlockedRooms();
    this.fetchAvailableRooms();
  });
  }

  fetchAllRooms() {
    this.roomService.getAllRooms().subscribe({
      next: (data) => {
        this.allRooms = data;
        this.floorItems = data.reduce((acc: any[], curr) => {
          let floorGroup = acc.find(x => x.floor === `Floor ${curr.floorNumber}`);
          if (!floorGroup) {
            floorGroup = { floor: `Floor ${curr.floorNumber}`, rooms: [] };
            acc.push(floorGroup);
          }
          floorGroup.rooms.push({ number: curr.roomNumber, status: curr.status, maintaince: curr.maintaince });
          return acc;
        }, []);
      },
      error: (err) => console.error(err)
    });
  }

  getFilteredRooms(rooms: any[]) {
    if (this.selectedStatus === 'All') return rooms;
    return rooms.filter(r => r.status === this.selectedStatus);
  }

  toggleManageMenu() {
    this.showManageMenu = !this.showManageMenu;
  }

  openAddMaintenance() {
    this.showManageMenu = false;
    this.showAddForm = true;
    this.showRemoveForm = false;
  }

  openRemoveMaintenance() {
    this.showManageMenu = false;
    this.showRemoveForm = true;
    this.showAddForm = false;
  }

  closeForms() {
    this.showAddForm = false;
    this.showRemoveForm = false;
    this.showManageMenu = false;
  }

  saveMaintenance() {
    this.roomService.addRoomToMaintainace(this.maintenanceForm).subscribe({
      next: (res) => {
        this.refreshService.triggerRefresh();
        setTimeout(() => this.closeForms(), 300);
        this.maintenanceForm = { roomNumber: 0, reason: '' };
      },
      error: (err) => console.error('blocking room fail', err)
    });
  }

  fetchBlockedRooms(){
    this.roomService.getBlockedRooms().subscribe({
      next: (data) => {
        this.maintenanceRecords = data
          .map(room => ({
            roomNumber: room.roomNumber,
          }));
      },
      error: (err) => console.error('Failed to fetch rooms:', err)
    });
  }

  fetchAvailableRooms() {
    this.roomService.getAvailableRooms().subscribe({
      next: (data) => {
        this.availableRooms = data
          .map(room => ({ roomNumber: room.roomNumber }));
      },
      error: (err) => console.error('Failed to fetch rooms:', err)
    });
  }


  markMaintenanceDone() {
    this.roomService.removeRoomFromMaintainace(this.selectedRoomForRemoval).subscribe({
      next: (res) => {
        this.refreshService.triggerRefresh();
        setTimeout(() => this.closeForms(), 300);
      },
      error: (err) => console.error('unblocking room fail', err)
    });
  }
}
