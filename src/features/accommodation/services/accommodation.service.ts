import api from '@/common/utils/axiosInstance';

const prefix = '/v1/accommodation';

export const create = async (dto: FormData) => {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };
  return api.post(prefix, dto, config);
};

export const getById = async (id: string) => {
  return api.get(`${prefix}/${id}`);
};

export const getAccomodationsByUser = async () => {
  return await api.get(`${prefix}/allByUser`);
};
