export interface CheckOutPayload {
  customerId: string;
  paymentMethod: string;
  roomNumbers: number[];
  paymentDateTime: Date;
  checkOutDate: Date;
  totalDays: Number;
  totalBill: Number;
  checkout: boolean;
}
