import api from '@/common/utils/axiosInstance';
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
