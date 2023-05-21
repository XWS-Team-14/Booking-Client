import { Availability } from '@/common/types/Availability';

export const isSpecialPricingOn = (
  pricingType: string,
  availability?: Availability
) => {
  if (availability?.special_pricing === undefined) return false;
  if (availability.special_pricing.length === 2) {
    if (
      availability?.special_pricing[0].title === pricingType ||
      availability?.special_pricing[1].title === pricingType
    )
      return true;
  } else {
    if (availability?.special_pricing[0].title === pricingType) return true;
  }
  return false;
};

export const getSpecialPricing = (
  pricingType: string,
  availability?: Availability
) => {
  if (availability?.special_pricing === undefined) return null;
  if (availability.special_pricing[0].title === pricingType) {
    return availability.special_pricing[0];
  }
  if (
    availability.special_pricing.length === 2 &&
    availability?.special_pricing[1].title === pricingType
  ) {
    return availability?.special_pricing[1];
  }
};
