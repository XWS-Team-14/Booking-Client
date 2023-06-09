import api from '@/common/utils/axiosInstance';

const prefix = '/v1/accommodation';

export const create = async (dto: FormData) => {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };
  return api.post(prefix, dto, config);
};

export const getById = async (id: string) => {
  return api.get(`${prefix}/id/${id}`);
};

export const getAccomodationsByUser = async () => {
  return await api.get(`${prefix}/allByUser`);
};

export const getAllAmenities = async () => await api.get(`${prefix}/amenities`);

export const getAll = async () => await api.get(`${prefix}/all`);

export const getRecomended = async (user_id : string) =>  await api.get('/v1/accommodation_recomender/get/'+user_id)