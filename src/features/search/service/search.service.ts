import api from '@/common/utils/axiosInstance';

import { SearchParams } from '../types/SearchParams';
import { SearchResultDto } from '../types/SearchResultDto';

export const fetchData = async (
  dto: SearchParams | undefined
): Promise<SearchResultDto> => {
  return api
    .get(
      '/v1/search/?country=' +
        checkValueString(dto?.country) +
        '&city=' +
        checkValueString(dto?.city) +
        '&address=' +
        checkValueString(dto?.address) +
        '&guests=' +
        checkValueNumber(dto?.guestCount) +
        '&date_start=' +
        checkValueString(dto?.start_date) +
        '&date_end=' +
        checkValueString(dto?.end_date)
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

function checkValueString(value: string | undefined) {
  console.log(value);
  if (value === undefined) {
    return '';
  }
  return value;
}
function checkValueNumber(value: number | undefined) {
  console.log(value);
  if (value === undefined) {
    return 0;
  }
  return value;
}
