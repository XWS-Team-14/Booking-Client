import DateInterval from './dateInterval';
import SpecialPricing from './specialPricing';

export default interface AvailabilityDto {
  availability_id?: string;
  accomodation_id: string;
  interval: DateInterval;
  pricing_type: string;
  base_price: number;
  occupied_intervals?: Array<DateInterval>;
  special_pricing: Array<SpecialPricing>;
}
