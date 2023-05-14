import api from '@/common/utils/axiosInstance';
import AvailabilityDto from '../types/availabilityDto';
import AvailabilitySearchDto from '../types/searchDto';

export const createAvailability = async (dto: AvailabilityDto) => {
  return await api.post('/v1/avail/create', dto);
};

export const updateAvailability = async (dto: AvailabilityDto) => {
  return await api.put('/v1/avail/update', dto);
};
export const deleteAvailability = async (id: string) => {
  return await api.delete('/v1/avail/delete/' + id);
};

export const getAllSearch = async (dto: AvailabilitySearchDto) => {};
export const getAllForUser = async () => {
  return await api.get('/v1/avail/user/');
};
export const getById = async (id: string) => {
  return await api.get('/v1/avail/id/' + id);
};
export const getAccomodationsByUser = async () => {
  return await api.get('/v1/accommodation/allByUser');
};
