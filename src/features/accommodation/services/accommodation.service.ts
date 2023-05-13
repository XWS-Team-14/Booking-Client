import api from "@/common/utils/axiosInstance";

export const create = async (dto: FormData) => {
  const config = {     
    headers: { 'content-type': 'multipart/form-data' }
  }
  return api.post('/v1/accommodation', dto, config);
};