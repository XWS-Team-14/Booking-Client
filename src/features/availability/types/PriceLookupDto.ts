/**    interval: DateInterval
    guests: int
    accommodation_id: str */

import { Interval } from '@/common/types/Interval';

export interface PriceLookupDto {
  interval: Interval;
  guests: number;
  accommodation_id: string;
}
