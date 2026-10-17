import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoState = {
  todos: Todo[];
  input: string;
  setInput: (value: string) => void;
  addTodo: () => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  clearCompleted: () => void;
};

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [
        { id: 1, text: "Next.js bilan loyiha yaratish", completed: false },
        { id: 2, text: "Zustand bilan state boshqarish", completed: true },
      ],
      input: "",
      setInput: (value) => set({ input: value }),
      addTodo: () => {
        const text = get().input.trim();

        if (!text) return;

        set((state) => ({
          todos: [
            ...state.todos,
            { id: Date.now(), text, completed: false },
          ],
          input: "",
        }));
      },
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        })),
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),
    }),
    {
      name: "zustand-todo-storage",
    },
  ),
);
