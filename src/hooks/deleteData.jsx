import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api/api.js';

export const useDeleteData = () => {
  return useMutation({
    mutationFn: (id) => apiClient.delete(`/todoitems/${id}`),
  });
};
