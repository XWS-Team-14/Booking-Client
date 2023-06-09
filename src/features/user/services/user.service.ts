import { UserDetails } from '@/common/types/User';
import v1 from '@/common/utils/axiosInstance';
const prefix = '/v1/user';

export const getCurrentUser = async () => {
  return v1.get(`${prefix}/active`);
};

export const updateUser = async (dto: UserDetails) => {
  return v1.put(`${prefix}/details`, dto);
};

export const deleteAccount = async () => {
  return v1.delete(`${prefix}/`);
};

export const deleteAccountSaga = async () =>
  v1.delete(`/v1/orchestrator/delete`);

export const getUserById = async (userId: string) => {
  return v1.get(`${prefix}/${userId}`);
};

export const getCurrentUserData = async () => {
  const user = await getCurrentUser();
  if (!!user && user.status === 200) {
    return {
      id: user.data.id,
      firstName: user.data.first_name,
      lastName: user.data.last_name,
      homeAddress: user.data.home_address,
      gender: user.data.gender,
      isFeatured: user.data.is_featured,
    };
  } else {
    return null;
  }
};
