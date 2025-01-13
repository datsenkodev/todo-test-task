import { useState } from 'react';

import { Container, Typography } from '@mui/material';

import { TodoList } from './components/TodoList';
import { AddTodo } from './components/AddTodo';

function App() {
  return (
    <Container
      maxWidth='sm'
      sx={{
        mx: 'auto',
        backgroundColor: '#fafafa',
        padding: '2rem',
        borderRadius: '10px',
      }}>
      <Typography component='h1' sx={{ color: 'black' }}>
        DatsenkoDev
      </Typography>
      <AddTodo />
      <TodoList />
    </Container>
  );
}

export default App;
