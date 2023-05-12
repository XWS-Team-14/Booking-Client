import AvailabilityDto from "../types/availabilityDto";
import api from '@/common/utils/axiosInstance';
import AvailabilitySearchDto from "../types/searchDto";

export const createAvailability = async(dto: AvailabilityDto) =>{
    return await api.post('/api/avail/create', dto);
}

export const updateAvailability = async(dto: AvailabilityDto)=>{
    return await api.post('/api/avail/update', dto);
}
export const deleteAvailability = async(id: string)=>{
    return await api.post('/api/avail/delete/'+ id);
}

export const GetAllSearch = async (dto: AvailabilitySearchDto)=>{
    
}
export const GetAllForUser = async (email: string)=>{
    
}
export const GetById = async (id: string)=>{
    return await api.post('/api/avail/id/'+ id);
}
