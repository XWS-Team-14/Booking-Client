import api from '@/common/utils/axiosInstance';
import { FlightParametersExpanded } from '../types/FlightParameters';

const prefix = '/v1/flights';

export const getSuggestedFlights = async (
  parameters: FlightParametersExpanded
) => {
  const urlParameters = new URLSearchParams(
    parameters as unknown as Record<string, string>
  ).toString();
  console.log(urlParameters);
  return await api.get(`${prefix}/?${urlParameters}`);
};
