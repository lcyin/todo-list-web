import { useState, useEffect } from "react";
import { Todo, TodoFilters, Pagination } from "../types/api";
import { todoApi } from "../services/api";

interface UseTodosReturn {
  todos: Todo[];
  pagination: Pagination | null;
  isLoading: boolean;
  error: string | null;
  filters: TodoFilters;
  setFilters: (filters: TodoFilters) => void;
  createTodo: (title: string, description?: string) => Promise<void>;
  updateTodo: (
    id: string,
    updates: { title?: string; description?: string; completed?: boolean }
  ) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  refreshTodos: () => Promise<void>;
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TodoFilters>({
    page: 1,
    limit: 10,
  });

  const fetchTodos = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await todoApi.getTodos(filters);
      console.log("API Response:", response.data);
      console.log("Todos data:", response.data.todos);
      console.log("Pagination:", response.data.pagination);
      setTodos(response.data.todos || []);
      setPagination(response.data.pagination || null);
    } catch (err: any) {
      console.error("API Error:", err);
      setError(err.response?.data?.error?.message || "Failed to fetch todos");
      setTodos([]); // Ensure todos is always an array even on error
    } finally {
      setIsLoading(false);
    }
  };

  const createTodo = async (title: string, description?: string) => {
    try {
      await todoApi.createTodo({ title, description });
      await fetchTodos(); // Refresh the list
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "Failed to create todo");
      throw err;
    }
  };

  const updateTodo = async (
    id: string,
    updates: { title?: string; description?: string; completed?: boolean }
  ) => {
    try {
      await todoApi.updateTodo(id, updates);
      await fetchTodos(); // Refresh the list
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "Failed to update todo");
      throw err;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoApi.deleteTodo(id);
      await fetchTodos(); // Refresh the list
    } catch (err: any) {
      setError(err.response?.data?.error?.message || "Failed to delete todo");
      throw err;
    }
  };

  const refreshTodos = async () => {
    await fetchTodos();
  };

  // Fetch todos when filters change
  useEffect(() => {
    fetchTodos();
  }, [filters]);

  return {
    todos,
    pagination,
    isLoading,
    error,
    filters,
    setFilters,
    createTodo,
    updateTodo,
    deleteTodo,
    refreshTodos,
  };
};
