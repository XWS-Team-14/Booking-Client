import api from '@/common/utils/axiosInstance';
import { PreferenceDto } from '../types/PreferenceDto';

const prefix = `/v1/notification/preference`;

export const getUserPreferences = async () => api.get(`${prefix}`);

export const updatePreference = async (preference: PreferenceDto) =>
  api.put(`${prefix}/${preference.id}`, preference);
