import { Stack } from '@mui/material';

import { Todos } from './components/Todos';
import { CompletedTodos } from './components/CompletedTodos';

export function App() {
  return (
    <Stack spacing={1} direction='row' sx={{ width: '900px' }}>
      <Todos />
      <CompletedTodos />
    </Stack>
  );
}
