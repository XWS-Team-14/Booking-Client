import api from '@/common/utils/axiosInstance';

import { SearchParams } from "../types/SearchParams";

export const search = async (dto: SearchParams) => {
  return await api.get('/v1/search/?country='+dto.country+'&city='+dto.city+'&address='+dto.address+'&guests='+dto.guestCount+'&date_start='+dto.start_date+'&date_end='+dto.end_date);
};
