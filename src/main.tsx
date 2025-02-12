import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { App } from './App.tsx';
import './index.css';

import { SelectedTodoProvider } from './context/SelectedTodoContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <SelectedTodoProvider>
        <App />
      </SelectedTodoProvider>
    </QueryClientProvider>
  </StrictMode>,
);
