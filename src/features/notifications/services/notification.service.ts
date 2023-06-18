import api from '@/common/utils/axiosInstance';
import Notification from '../types/Notification';

const prefix = `/v1/notification/`;

export const notify = async (notification: Notification) =>
  await api.post(prefix, notification);
