import AvailabilityDto from "../types/availabilityDto";
import api from '@/common/utils/axiosInstance';
import AvailabilitySearchDto from "../types/searchDto";

export const createAvailability = async(dto: AvailabilityDto) =>{
    return await api.post('/api/avail/create', dto);
}

export const updateAvailability = async(dto: AvailabilityDto)=>{
    return await api.put('/api/avail/update', dto);
}
export const deleteAvailability = async(id: string)=>{
    return await api.delete('/api/avail/delete/'+ id);
}

export const getAllSearch = async (dto: AvailabilitySearchDto)=>{
   
}
export const getAllForUser = async (email: string)=>{
    return await api.get('/api/avail/all/'); //temporary testing purposes
}
export const getById = async (id: string)=>{
    return await api.get('/api/avail/id/'+ id);
}
