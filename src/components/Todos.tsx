import { FC } from 'react';
import { Container, Typography } from '@mui/material';

import { useTodos } from '../hooks/getData';

import { TodoItem } from '../types/types';

import { TodoList } from './TodoList';
import { AddTodo } from './AddTodo';
import { ActionButtons } from './ActionButtons';

export const Todos: FC = () => {
  const { data: todos } = useTodos();
  const incompleteTodos = todos?.filter((todo: TodoItem) => !todo.isComplete) || [];

  return (
    <Container
      maxWidth='sm'
      sx={{
        mx: 'auto',
        backgroundColor: '#85bcf4',
        padding: '2rem',
        borderRadius: '10px',
      }}>
      <Typography component='h1' variant='h5' textAlign='center'>
        Create your own ToDo List!
      </Typography>
      <AddTodo />
      {incompleteTodos.length ? <ActionButtons /> : null}
      <TodoList />
    </Container>
  );
};
