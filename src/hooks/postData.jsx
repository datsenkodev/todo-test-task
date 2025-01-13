import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api/api.js';

export const usePostData = () => {
  return useMutation({
    mutationKey: ['newTodo'],
    mutationFn: (newTodo) => apiClient.post('/todoitems', newTodo),
  });
};
