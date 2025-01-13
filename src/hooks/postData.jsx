import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../api/api.js';

export const usePostData = () => {
  return useMutation({
    mutationKey: ['newTodo'],
    mutationFn: (newTodo) => apiClient.post('/todoitems', newTodo),
  });
};

export const useChangeStatus = () => {
  return useMutation({
    mutationKey: ['changeStatus'],
    mutationFn: (id) => apiClient.put(`/todoitems/${id}`, { IsComplete: true }),
  });
};
