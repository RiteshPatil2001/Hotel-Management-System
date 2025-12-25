export interface CheckinPayload {
  customerId: string;
  name: string;
  location: string;
  totalBookings: number;
  otherMembers: string;
  fullAddress: string;
  idType: string;
  idDetails: string;
  roomsCount: number;
  roomNumbers: string;
  totalBill: number;
  paymentMethod?: string | null;
  paymentDateTime?: Date | null;
  checkInDate: Date;
  checkOutDate?: Date | null;
  foreignClient: boolean;
  checkout?: boolean;
}
