import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

import { useTodos } from '../hooks/getData';
import { useDeleteData } from '../hooks/deleteData';
import { Checkbox, Paper, Stack } from '@mui/material';

interface ComponentProps {
  // title: string;
}

interface TodoItem {
  id: number;
  name: string;
  isComplete: boolean;
}

export const TodoList: FC<ComponentProps> = () => {
  const { data: users, error, isLoading } = useTodos();
  const { mutate: deleteItem } = useDeleteData();
  const queryClient = useQueryClient();

  const handleDeleteItem = (id: number) => {
    deleteItem(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Stack
      spacing={1}
      sx={{ maxHeight: '50svh', minHeight: '20rem', overflowY: 'scroll', padding: 2 }}>
      {users.map((todo: TodoItem) => (
        <Paper
          elevation={10}
          key={todo.id}
          sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {todo.name}
          <Checkbox onClick={() => handleDeleteItem(todo.id)} />
        </Paper>
      ))}
    </Stack>
  );
};
