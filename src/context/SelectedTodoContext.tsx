import { createContext, useContext, useState, ReactNode } from 'react';

import { TodoItem, SelectedTodoContextType } from '../types/types';

const SelectedTodoContext = createContext<SelectedTodoContextType | undefined>(undefined);

export const SelectedTodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedTodoItems, setSelectedTodoItems] = useState<TodoItem[]>([]);

  const toggleTodoSelection = (todoItem: TodoItem) => {
    setSelectedTodoItems((prev) =>
      prev.includes(todoItem)
        ? prev.filter((item) => item.id !== todoItem.id)
        : [...prev, todoItem],
    );
  };

  const clearSelectedTodoItems = () => {
    setSelectedTodoItems([]);
  };

  return (
    <SelectedTodoContext.Provider
      value={[selectedTodoItems, toggleTodoSelection, clearSelectedTodoItems]}>
      {children}
    </SelectedTodoContext.Provider>
  );
};

export const useSelectedTodo = (): SelectedTodoContextType => {
  const context = useContext(SelectedTodoContext);
  if (!context) {
    throw new Error('useSelectedTodo must be used within a SelectedTodoProvider');
  }
  return context;
};
