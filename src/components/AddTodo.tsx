import { FC, useState, FormEvent } from 'react';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

import { useQueryClient } from '@tanstack/react-query';

import { usePostData } from '../hooks/postData';

export const AddTodo: FC = () => {
  const { mutate: addTodo } = usePostData();
  const [inputValue, setInputValue] = useState<string>('');

  const queryClient = useQueryClient();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
        alignItems: 'center',
        gap: '1rem',
        my: '1rem',
      }}>
      <TextField
        label='Welcome'
        placeholder='Enter new goal'
        required
        autoFocus
        fullWidth
        id='outlined-basic'
        variant='standard'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        sx={{
          '& .MuiInputBase-input': {
            color: 'white',
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
        }}
      />
      <Tooltip title='Add new item' placement='left'>
        <Button type='submit'>
          <AddBoxRoundedIcon sx={{ fontSize: '3rem', color: 'white' }} />
        </Button>
      </Tooltip>
    </Box>
  );
};
