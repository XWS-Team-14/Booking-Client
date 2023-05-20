import api from '@/common/utils/axiosInstance';
import EmailChangeDto from '../types/EmailChangeDto';
import LoginDto from '../types/LoginDto';
import PasswordChangeDto from '../types/PasswordChangeDto';
import RegisterDto from '../types/RegisterDto';

const prefix = `/v1/auth`;

export const register = async (dto: RegisterDto) => {
  return await api.post(`${prefix}/register`, dto);
};

export const login = async (dto: LoginDto) => {
  return await api.post(`${prefix}/login/`, dto);
};

export const logout = async () => {
  return await api.post(`${prefix}/logout/`);
};

export const refresh = async () => {
  return api.post(`${prefix}/token/refresh/`);
};

export const verifyToken = async () => {
  return api.post(`${prefix}/token/verify/`);
};

export const updatePassword = async (dto: PasswordChangeDto) => {
  return api.put(`${prefix}/password`, dto);
};

export const updateEmail = async (dto: EmailChangeDto) => {
  return api.put(`${prefix}/email`, dto);
};
