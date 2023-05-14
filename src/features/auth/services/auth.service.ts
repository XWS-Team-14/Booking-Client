import v1 from '@/common/utils/axiosInstance';
import EmailChangeDto from '../types/EmailChangeDto';
import LoginDto from '../types/LoginDto';
import PasswordChangeDto from '../types/PasswordChangeDto';
import RegisterDto from '../types/RegisterDto';

export const register = async (dto: RegisterDto) => {
  return await v1.post('/v1/auth/register/', dto);
};

export const login = async (dto: LoginDto) => {
  return await v1.post('/v1/auth/login/', dto);
};

export const logout = async () => {
  return await v1.post('/v1/auth/logout/');
};

export const refresh = async () => {
  return v1.post('/v1/auth/token/refresh/');
};

export const verifyToken = async () => {
  return v1.post('/v1/auth/token/verify/');
};

export const updatePassword = async (dto: PasswordChangeDto) => {
  return v1.put('/v1/auth/password', dto);
};

export const updateEmail = async (dto: EmailChangeDto) => {
  return v1.put('/v1/auth/email', dto);
};
