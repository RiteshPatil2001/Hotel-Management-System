import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Customer } from '../../models/customer.model';
import { RoomService } from '../../services/rooms.service';
import { CheckInService } from '../../services/checkin.service';
import { CheckinPayload } from '../../models/checkInPayload.model';
import { RefreshService } from '../../services/refresh.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-checkinmodal',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMultiSelectDropDownModule, MatIconModule],
  templateUrl: './checkinmodal.component.html',
  styleUrls: ['./checkinmodal.component.scss']
})
export class CheckinmodalComponent {
  checkInCustomer!: Customer;
  payload!: CheckinPayload;

  customerName!: string;
  otherMembers!: string;
  fullAddress!: string;
  location!: string;
  idType!: string;
  idDetails!: string;
  isForeignClient: boolean = false;

  selectRooms: { room_id: number; item_text: string }[] = [];
  selectedRooms: { room_id: number; item_text: string }[] = [];
  dropdownSettings: IDropdownSettings = {};
  checkinDateTime!: Date;
  formatedCheckInDateTime!: String;

  private pipe = new DatePipe('en-IN');

  now = new Date();
  datePart = this.pipe.transform(this.now, 'yyMMdd'); // "250925"
  randomPart = Math.floor(1000 + Math.random() * 9000); // 4-digit random
  customerId = `sep${this.datePart}${this.randomPart}`;       // "sep2509251234"


  constructor(
    public dialogRef: MatDialogRef<CheckinmodalComponent>,
    private roomService: RoomService,
    private checkInService: CheckInService,
    private refreshService: RefreshService
  ) {}

  ngOnInit() {
    const now = new Date();
    this.checkinDateTime =  now;
    this.formatedCheckInDateTime = this.pipe.transform(now, 'dd MMM yyyy - hh:mm a', 'Asia/Kolkata')!;

    this.fetchAvailableRooms();

    this.dropdownSettings = {
      idField: 'room_id',
      textField: 'item_text',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      maxHeight: 140
    };

    this.checkInCustomer = {
      customerId: '',
      name: '',
      location: '',
      foreignClient: false,
      totalBookings: 0,
      otherMembers: [],
      fullAddress: '',
      idType: '',
      idDetails: '',
      roomsCount: 0,
      roomNumbers: [],
      totalBill: 0,
      checkInDate: this.checkinDateTime,
      perDayBill: 0,
      totalDays: 0
    };
  }

  fetchAvailableRooms() {
    this.roomService.getAvailableRooms().subscribe({
      next: (data) => {
        this.selectRooms = data
          .filter(room => room.status === 'available')
          .map(room => ({
            room_id: room.roomNumber,
            item_text: `${room.floorNumber} - ${room.roomNumber}`
          }));
      },
      error: (err) => console.error('Failed to fetch rooms:', err)
    });
  }

  get selectedRoomIds(): number[] {
    return this.selectedRooms.map(room => room.room_id);
  }

  get selectedRoomCount(): number {
    return this.selectedRooms.length;
  }

  get otherMembersArray(): string[] {
    return this.otherMembers ? this.otherMembers.split(',').map(m => m.trim()) : [];
  }

  get totalBookingCount(): number {
    return this.otherMembersArray.length + 1; // +1 for primary customer
  }

  generateNewID(count: number): string {
    const now = new Date();
    const month = now.toLocaleString('en-US', { month: 'short' }).toLowerCase();
    const day = String(now.getDate()).padStart(2, '0'); // e.g., "26"
    const year = String(now.getFullYear()).slice(-2);   // last two digits, e.g., "25"
    const countStr = String(count).padStart(3, '0');   // pad with leading zeros
    return `${month}${day}${year}${countStr}`;
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmitCheckIN() {
    this.checkInCustomer.roomNumbers = this.selectedRoomIds;
    this.checkInCustomer.roomsCount = this.selectedRoomCount;
    this.checkInCustomer.name = this.customerName;
    this.checkInCustomer.fullAddress = this.fullAddress;
    this.checkInCustomer.idType = this.idType;
    this.checkInCustomer.idDetails = this.idDetails;
    this.checkInCustomer.foreignClient = this.isForeignClient;
    this.checkInCustomer.location = this.location;
    this.checkInCustomer.totalBookings = this.totalBookingCount;
    this.checkInCustomer.otherMembers = this.otherMembersArray;
    this.checkInCustomer.customerId = this.customerId

    this.payload = {
        ...this.checkInCustomer,
        roomNumbers: this.selectedRoomIds.join(', '),
        otherMembers: this.otherMembersArray.join(', ')
    };

    this.checkInService.customerCheckIn(this.payload).subscribe({
      next: (res) => {
        this.refreshService.triggerRefresh();
        this.dialogRef.close(this.checkInCustomer);
      },
      error: (err) => {
        console.error('Check-in failed', err);
      }
    });
  }
}
