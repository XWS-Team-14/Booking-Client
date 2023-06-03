import { Location } from '@/common/types/Location';

export interface SearchAccommodation {
  id: string;
  accommodation_id: string;
  name: string;
  location: Location;
  features: string[];
  image_urls: string[];
  min_guests: number;
  max_guests: number;
  auto_acceptence_flag: string;
  total_price: number;
  base_price: number;
  host_id?: string;
  pricing_type?: string;
}
