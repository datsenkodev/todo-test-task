export interface TodoItem {
  id: number;
  name: string;
  isComplete: boolean;
}

export type SelectedTodoContextType = [
  selectedTodoItems: TodoItem[],
  (todoItem: TodoItem) => void,
  () => void,
];
