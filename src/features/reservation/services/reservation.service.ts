import api from '@/common/utils/axiosInstance';
import AccommodationDto from '@/features/availability/types/accommodationDto';
import ReservationDto, { CreateReservationDto } from '../types/ReservationDto';

export const getByHost = async (): Promise<ReservationDto[]> => {
  return await api.get(`/v1/reservation/host`);
};
export const getPendingByHost = async (): Promise<ReservationDto[]> => {
  return await api.get(`/v1/reservation/host/pending`);
};
export const getByAccommodation = async (
  id: string
): Promise<ReservationDto[]> => {
  return await api.get(`/v1/reservation/host/${id}`);
};
export const acceptReservation = async (dto: ReservationDto) => {
  return await api.put('/v1/reservation/accept', dto);
};
export const createReservation = async (
  dto: CreateReservationDto
): Promise<string> => {
  return await api.post('/v1/reservation/create', dto);
};
export const cancelReservation = async (id: string): Promise<string> => {
  return await api.delete(`/v1/reservation/delete/${id}`);
};
export const getActiveByGuest = async (): Promise<ReservationDto[]> => {
  return await api.get(`/v1/reservation/guest/active`);
};
export const getUserById = async (id: string) => {
  return await api.get(`/v1/user/${id}`);
};
export const getGuest = async () => {
  return await api.get('/v1/reservation/guest/id');
};
export const getAccommodations = async (): Promise<AccommodationDto[]> => {
  return await api.get('/v1/accommodation/all');
};
export const getAccommodationById = async (id: string) => {
  return await api.get(`/v1/reservation/accommodation/id/${id}`);
};
