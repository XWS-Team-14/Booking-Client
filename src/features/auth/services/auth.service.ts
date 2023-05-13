import { UserDetails } from '@/common/types/User';
import api from '@/common/utils/axiosInstance';
import EmailChangeDto from '../types/EmailChangeDto';
import LoginDto from '../types/LoginDto';
import PasswordChangeDto from '../types/PasswordChangeDto';
import RegisterDto from '../types/RegisterDto';

export const register = async (dto: RegisterDto) => {
  return await api.post('/api/auth/register/', dto);
};

export const login = async (dto: LoginDto) => {
  return await api.post('/api/auth/login/', dto);
};

export const logout = async () => {
  return await api.post('/api/auth/logout/');
};

export const refresh = async () => {
  return api.post('api/auth/token/refresh/');
};

export const verifyToken = async () => {
  return api.post('api/auth/token/verify/');
};

export const getCurrentUser = async () => {
  return api.get('api/user/active');
};

export const updateUser = async (dto: UserDetails) => {
  return api.put('/api/user/details', dto);
};

export const updatePassword = async (dto: PasswordChangeDto) => {
  return api.put('/api/auth/password', dto);
};

export const updateEmail = async (dto: EmailChangeDto) => {
  return api.put('/api/auth/email', dto);
};

export const deleteAccount = async () => {
  return api.delete('/api/user/');
};

export const getCurrentUserData = async () => {
  const user = await getCurrentUser();
  if (user.status === 200) {
    return {
      firstName: user.data.first_name,
      lastName: user.data.last_name,
      homeAddress: user.data.home_address,
      gender: user.data.gender,
    };
  } else {
    return null;
  }
};
