import { UserDetails } from '@/common/types/User';
import v1 from '@/common/utils/axiosInstance';


export const getCurrentUser = async () => {
  return v1.get('v1/user/active');
};

export const updateUser = async (dto: UserDetails) => {
  return v1.put('/v1/user/details', dto);
};

export const deleteAccount = async () => {
  return v1.delete('/v1/user/');
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
