export default interface ReservationDto{
    id: string
    accommodation_id: string
    host_id: string
    guest_id: string
    number_of_guests: number
    beginning_date: Date
    ending_date: Date
    total_price: number
    status: string
}