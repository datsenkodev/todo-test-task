import React, { FC, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

import { useQueryClient } from '@tanstack/react-query';

import { usePostData } from '../hooks/postData';

export const AddTodo: FC = () => {
  const { mutate: addTodo } = usePostData();
  const [inputValue, setInputValue] = useState<string>('');

  const queryClient = useQueryClient();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(
      { name: inputValue, isComplete: false },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
      },
    );
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1rem',
        my: '1rem',
      }}>
      <TextField
        placeholder='Enter new to do'
        required
        autoFocus
        id='outlined-basic'
        variant='outlined'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type='submit'>
        <AddBoxRoundedIcon sx={{ fontSize: '3rem' }} />
      </Button>
    </Box>
  );
};
