import { FC } from 'react';
import { Button, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import { useDeleteData } from '../hooks/deleteData';
import { useChangeStatus } from '../hooks/postData';

import { useSelectedTodo } from '../context/SelectedTodoContext';

export const ActionButtons: FC = () => {
  // eslint-disable-next-line no-unused-vars
  const [selectedTodoItems, toggleTodoSelection, clearSelectedTodoItems] = useSelectedTodo();
  const { mutate: deleteItem } = useDeleteData();
  const { mutate: changeStatus } = useChangeStatus();
  const queryClient = useQueryClient();

  const handleDeleteSelected = () => {
    selectedTodoItems.map((todoItem) => {
      deleteItem(todoItem.id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
      });
    });
    clearSelectedTodoItems();
  };

  const handleSetStatusDone = () => {
    selectedTodoItems.map((todoItem) => {
      changeStatus(todoItem.id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
      });
    });
    clearSelectedTodoItems();
  };
  return (
    <Stack
      direction='row'
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: '1rem' }}>
      <Button variant='outlined' onClick={handleSetStatusDone}>
        Mark as completed
      </Button>
      <Button variant='outlined' color='error' onClick={handleDeleteSelected}>
        Delete
      </Button>
    </Stack>
  );
};
