import api from '@/common/utils/axiosInstance';
import { FlightParametersExpanded } from '../types/FlightParameters';

const prefix = '/v1/flights';

export const getSuggestedFlights = async (
  parameters: FlightParametersExpanded
) => {
  const urlParameters = new URLSearchParams(
    parameters as unknown as Record<string, string>
  ).toString();
  return await api.get(`${prefix}/?${urlParameters}`);
};

export const purchase = async (id: string, count: number, apiKey: string) =>
  await api.post(
    `${prefix}/purchase`,
    {
      flight_id: id,
      num_of_tickets: count,
    },
    {
      headers: {
        HTTP_API_KEY: apiKey,
      },
    }
  );
