export interface Customer {
  id?: number;
  customerId: string;
  name: string;
  location: string;
  totalBookings: number;
  otherMembers: string[];
  fullAddress: string;
  idType: string;
  idDetails: string;
  roomsCount: number;
  roomNumbers: number[];
  perDayBill: number,
  totalDays: number,
  totalBill: number;
  paymentMethod?: string | null;
  paymentDateTime?: Date | null;
  checkInDate: Date;
  checkOutDate?: Date | null;
  foreignClient: boolean;
  checkout?: boolean;
}
