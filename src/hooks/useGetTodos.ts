import { useQuery } from "@tanstack/react-query";
import { TodosService } from "../api/services/TodosService";
import type { TodosResponse } from "../api/models/TodosResponse";

interface UseGetTodosOptions {
  page?: number;
  limit?: number;
  completed?: boolean;
  search?: string;
  enabled?: boolean;
}

export const useGetTodos = (options: UseGetTodosOptions = {}) => {
  const { page = 1, limit = 10, completed, search, enabled = true } = options;

  return useQuery<TodosResponse>({
    queryKey: ["todos", page, limit, completed, search],
    queryFn: () => TodosService.getApiV1Todos(page, limit, completed, search),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
};
