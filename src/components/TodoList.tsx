import { FC } from 'react';
import { Checkbox, Paper, Stack, Typography } from '@mui/material';
import { useSelectedTodo } from '../context/SelectedTodoContext';
import TokenIcon from '@mui/icons-material/Token';

import { useTodos } from '../hooks/getData';
import { TodoItem } from '../types/types';

export const TodoList: FC = () => {
  const { data: todos, error, isLoading } = useTodos();

  const [selectedTodoItems, toggleTodoSelection] = useSelectedTodo();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error.message);
  }

  const incompleteTodos = todos?.filter((todo: TodoItem) => !todo.isComplete) || [];

  if (incompleteTodos.length === 0) {
    return (
      <Stack
        sx={{
          maxHeight: '50svh',
          minHeight: '13rem',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          justifyContent: 'center',
          alignItems: 'center',
          color: 'black',
          my: 8,
        }}>
        <TokenIcon />
        <Typography variant='h5'>To do list is empty</Typography>
        <Typography>So you're good at solving tasks )</Typography>
      </Stack>
    );
  }

  return (
    <Stack
      spacing={1}
      sx={{ maxHeight: '50svh', minHeight: '20rem', overflowY: 'scroll', padding: 2 }}>
      {incompleteTodos &&
        incompleteTodos.map((todo: TodoItem) => (
          <Paper
            elevation={10}
            key={todo.id}
            square={false}
            sx={{ p: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            onClick={() => toggleTodoSelection(todo)}>
            {todo.name}
            <Checkbox checked={selectedTodoItems.some((item: TodoItem) => item.id === todo.id)} />
          </Paper>
        ))}
    </Stack>
  );
};
