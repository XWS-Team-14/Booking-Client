import api from '@/common/utils/axiosInstance';
import AccommodationDto from '@/features/availability/types/accommodationDto';
import {
  CreateReservationDto,
  ReservationDto,
  ReservationStatusDto,
} from '../types/ReservationDto';

export const getByHost = async (): Promise<ReservationDto[]> => {
  return await api.get(`/v1/reservation/host`);
};
export const getPendingByHost = async (): Promise<ReservationDto[]> => {
  return await api.get(`/v1/reservation/host/pending`);
};
export const getByHostId = async (id: string): Promise<ReservationDto[]> => {
  return await api.get(`/v1/reservation/host/${id}`);
};
export const acceptReservation = async (
  id: string,
  dto: ReservationStatusDto
) => {
  return await api.put(`/v1/reservation/${id}/status`, dto);
};
export const createReservation = async (
  dto: CreateReservationDto
): Promise<string> => {
  return await api.post('/v1/reservation/create', dto);
};
export const cancelReservation = async (id: string): Promise<string> => {
  return await api.delete(`/v1/reservation/delete/${id}`);
};
export const getActiveByGuest = async () => {
  return await api.get(`/v1/reservation/guest/active`);
};
export const getByGuest = async () => {
  return await api.get(`/v1/reservation/guest/history`);
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
export const getByAccommodation = async (id: string) => {
  return await api.get(`/v1/reservation/accommodation/${id}`);
};
