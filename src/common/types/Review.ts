import { User } from './User';

export default interface Review {
  poster: User;
  title: string;
  content: string;
  hostRating: number;
  accommodationRating: number;
  date: string;
}
