export interface CreateReviewDto {
    accommodation_id: string;
    host_id: string;
    host_rating: number;
    accommodation_rating: number;
  }

export interface UpdateReviewDto{
  id: string;
  host_rating: number;
  accommodation_rating: number;
}
export interface ReviewDto {
    id: string;
    accommodation: string;
    poster: string;
    hostId: string;
    guest: string;
    hostRating: number;
    accommodationRating: number;
    date : string;
}