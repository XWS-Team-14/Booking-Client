import SpecialPricing from '@/features/availability/types/specialPricing';
import { Location } from './Location';

export interface Accommodation {
  id: string;
  user_id: string;
  name: string;
  location: Location;
  features: string[];
  image_urls: string[];
  min_guests: number;
  max_guests: number;
}
