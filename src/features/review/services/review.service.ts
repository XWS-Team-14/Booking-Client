import api from '@/common/utils/axiosInstance';
import { CreateReviewDto, UpdateReviewDto } from '../types/ReviewDto';

export const createReview = async (dto: CreateReviewDto): Promise<string> => {
  return await api.post('/v1/review', dto);
};

export const updateReview = async (dto: UpdateReviewDto): Promise<string> => {
  return await api.put('/v1/review/update', dto);
};

export const deleteReview = async (id: string): Promise<string> => {
  return await api.delete(`/v1/review/delete/${id}`);
};

export const getByHost = async (id: string): Promise<string> => {
  return await api.get(`/v1/review/accommodation/${id}`);
};

export const getByAccommodation = async (id: string): Promise<any> => {
  return await api.get(`/v1/review/accommodation/${id}`);
};

export const getByPoster = async (id: string): Promise<any> => {
  return await api.get(`/v1/review/poster/${id}`);
};

export const canUserReview = async () => await api.get(`/v1/review/can-review`);
