export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  date: string;
}

export function createTodo(text: string, date: string): Todo {
  return {
    id: Date.now(),
    text,
    completed: false,
    date,
  };
}

export function countTodosByDate(todos: Todo[], dateStr: string): number {
  return todos.filter((t) => t.date === dateStr).length;
}
