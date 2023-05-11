import api from '@/common/utils/axiosInstance';
import ReservationDto from '../types/ReservationDto';

export const getByHost  = async (id : string) : Promise<ReservationDto[]> => {
    return await api.get(`/api/reservation/host/${id}`);
};
export const getByAccommodation = async (id: string): Promise<ReservationDto[]> => {
    return await api.get(`/api/reservation/host/${id}` );
};
export const acceptReservation  = async (dto : ReservationDto) => {
    return await api.post('api/reservation/accept',dto);
};