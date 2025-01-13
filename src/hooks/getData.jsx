import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../api/api.js';

export const useTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await apiClient.get('/todoitems');
      return response.data;
    },
    refetchOnWindowFocus: true,
  });
};
