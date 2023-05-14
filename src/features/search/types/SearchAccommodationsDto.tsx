import { Accommodation } from '@/common/types/Accommodation';

export interface SearchAccommodationDto extends Accommodation {
  totalPrice?: number;
  basePrice?: number;
  hostId?: string;
}
