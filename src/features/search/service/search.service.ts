import api from '@/common/utils/axiosInstance';

import { SearchParams } from '../types/SearchParams';
import { SearchResultDto } from '../types/SearchResultDto';

const prefix = '/v1/search';

export const fetchData = async (
  dto: SearchParams | undefined
): Promise<SearchResultDto> => {
  console.log(dto);
  const params = new URLSearchParams({
    country: checkValueString(dto?.country),
    city: checkValueString(dto?.city),
    address: checkValueString(dto?.address),
    guests: checkValueNumber(dto?.guests).toString(),
    date_start: checkValueString(dto?.start_date),
    date_end: checkValueString(dto?.end_date),
    price_min: checkValueNumber(dto?.price_min).toString(),
    price_max: (dto?.price_max ? dto.price_max : -1).toString(),
    must_be_featured_host: (dto?.must_be_featured_host !== undefined
      ? dto?.must_be_featured_host
      : false
    ).toString(),
  });
  dto?.amenities?.forEach((amenity) => params.append('amenities', amenity));
  return api
    .get(`${prefix}/?${params}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

const checkValueString = (value: string | undefined) => (value ? value : '');
const checkValueNumber = (value: number | undefined) => (value ? value : 0);
