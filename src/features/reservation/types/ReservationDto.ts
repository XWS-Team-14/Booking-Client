export interface ReservationDto {
  id: string;
  accommodation: any;
  host_id: string;
  guest: any;
  number_of_guests: number;
  beginning_date: Date;
  ending_date: Date;
  total_price: number;
  status: number;
}

export interface CreateReservationDto {
  accommodation_id: string;
  host_id: string;
  number_of_guests: number;
  beginning_date: string;
  ending_date: string;
  total_price: number;
}
