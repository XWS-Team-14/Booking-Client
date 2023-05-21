import { Interval } from './Interval';
import { SpecialPricing } from './SpecialPricing';

export interface Availability {
  accomodation_id: string;
  availability_id: string;
  base_price: number;
  interval: Interval;
  pricing_type: 'Per_guest' | 'Per_unit';
  special_pricing: SpecialPricing[];
}
