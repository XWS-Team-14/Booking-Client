import api from '@/common/utils/axiosInstance';
import LoginDto from '../types/LoginDto';
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
  return api.get('api/auth/user');
};

export const getCurrentUserData = async () => {
  const user = await getCurrentUser();
  if (user.status === 200) {
    return {
      firstName: user.data.first_name,
      lastName: user.data.last_name,
      email: user.data.email,
    };
  } else {
    return null;
  }
};
export const getUserCreds = async() =>{
  return api.get('/api/auth/user/');
}