import api from '@/common/utils/axiosInstance';
import ReservationDto from '../types/ReservationDto';
import AccommodationDto from '@/features/availability/types/accommodationDto';

export const getByHost  = async () : Promise<ReservationDto[]> => {
    return await api.get(`/v1/reservation/host`);
};
export const getPendingByHost  = async () : Promise<ReservationDto[]> => {
    return await api.get(`/v1/reservation/host/pending`);
};
export const getByAccommodation = async (id: string): Promise<ReservationDto[]> => {
    return await api.get(`/v1/reservation/host/${id}` );
};
export const acceptReservation  = async (dto : ReservationDto) => {
    return await api.put('v1/reservation/accept',dto);
};
export const createReservation = async (dto : ReservationDto): Promise<string> =>{
    return await api.post('v1/reservation/create',dto);
}
export const cancelReservation = async (id : string): Promise<string> =>{
    return await api.delete(`v1/reservation/delete/${id}`)
}
export const getActiveByGuest = async () : Promise<ReservationDto[]> => {
    return await api.get(`/v1/reservation/guest/active`);
};
export const GetUserById = async (id : string) => {
    return await api.get(`/v1/user/${id}`);
};
export const GetGuest = async () => {
    return await api.get('v1/reservation/guest/id')
}
export const GetAccommodations = async () : Promise<AccommodationDto[]> => {
    return await api.get("/v1/accommodation/all")
};