import { Accommodation } from '@/common/types/Accommodation';

export interface SearchAccommodationDto extends Accommodation {
  collective_price?: number;
  status?: 'available' | 'taken' | 'unavailable';
}
