import { Availability } from '@/common/types/Availability';

export const isSpecialPricingOn = (
  pricingType: string,
  availability?: Availability
) => {
  if (availability?.special_pricing === undefined) return false;
  if (
    availability?.special_pricing[0].title === pricingType ||
    availability?.special_pricing[1].title === pricingType
  )
    return true;
  return false;
};
