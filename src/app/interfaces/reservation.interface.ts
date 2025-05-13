export interface Reservation {
  user_id: number;
  table_id: number;
  reservation_date: string;
  reservation_time: string;
  num_guests: number;
  special_request: string;
  status: string;
}
