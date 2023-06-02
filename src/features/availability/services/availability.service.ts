import api from '@/common/utils/axiosInstance';
import { PriceLookupDto } from '../types/PriceLookupDto';
import AvailabilityDto from '../types/availabilityDto';
import AvailabilitySearchDto from '../types/searchDto';

const prefix = '/v1/avail';

export const createAvailability = async (dto: AvailabilityDto) =>
  await api.post(`${prefix}/create`, dto);

export const updateAvailability = async (dto: AvailabilityDto) =>
  await api.put(`${prefix}/update`, dto);

export const deleteAvailability = async (id: string) =>
  await api.delete(`${prefix}/delete/` + id);

export const getAllSearch = async (dto: AvailabilitySearchDto) => {};

export const getAllForUser = async () => await api.get(`${prefix}/user/`);

export const getById = async (id: string) =>
  await api.get(`${prefix}/id/` + id);

export const getByAccommodationId = async (accommodationId: string) =>
  await api.get(`${prefix}/accommodation/${accommodationId}`);

export const getPrice = async (dto: PriceLookupDto) => {
  const params = new URLSearchParams({
    date_start: dto.interval.date_start ? dto.interval.date_start : '',
    date_end: dto.interval.date_end ? dto.interval.date_end : '',
    guests: dto.guests ? dto.guests.toString() : '1',
    accommodation_id: dto.accommodation_id ? dto.accommodation_id : '',
  });
  return await api.get(`${prefix}/price/?${params}`);
};
