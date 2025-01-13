import { FC } from 'react';
import { Container, Paper, Stack, Typography } from '@mui/material';

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CheckIcon from '@mui/icons-material/Check';

import { useTodos } from '../hooks/getData';

import { TodoItem } from '../types/types';

export const CompletedTodos: FC = () => {
  const { data: todos, error, isLoading } = useTodos();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error.message);
  }

  const completeTodos = todos?.filter((todo: TodoItem) => !!todo.isComplete) || [];

  if (completeTodos.length === 0) {
    return (
      <Container
        maxWidth='sm'
        sx={{
          mx: 'auto',
          backgroundColor: '#85bcf4',
          padding: '2rem',
          borderRadius: '10px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
            my: 8,
          }}>
          <TaskAltIcon />
          <Typography variant='h5'>You haven't completed any goals</Typography>
          <Typography>Go ahead</Typography>
        </Stack>
      </Container>
    );
  }

  return (
    <Container
      maxWidth='sm'
      sx={{
        mx: 'auto',
        backgroundColor: '#85bcf4',
        padding: '2rem',
        borderRadius: '10px',
      }}>
      <Typography component='h2' variant='h5' textAlign='center'>
        Completed things
      </Typography>
      <Stack
        direction='column'
        spacing={1}
        sx={{ maxHeight: '50svh', minHeight: '20rem', overflowY: 'scroll', padding: 2 }}>
        {completeTodos &&
          completeTodos.map((todo: TodoItem) => (
            <Paper
              elevation={10}
              key={todo.id}
              sx={{
                p: 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '2px solid grey',
                background: '#ffffff',
                color: 'black',
              }}>
              {todo.name}
              <CheckIcon sx={{ color: 'green' }} />
            </Paper>
          ))}
      </Stack>
    </Container>
  );
};
