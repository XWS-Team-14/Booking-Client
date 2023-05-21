import { Location } from '@/common/types/Location';

export interface SearchAccommodation {
  id: string;
  accommodationId: string;
  name: string;
  location: Location;
  features: string[];
  imageUrls: string[];
  minGuests: number;
  maxGuests: number;
  autoAcceptenceFlag: string;
  totalPrice: number;
  basePrice: number;
  hostId?: string;
  pricingType?: string;
}
