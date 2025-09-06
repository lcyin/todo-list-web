import { useQuery } from "@tanstack/react-query";
import { TodosService } from "../api/services/TodosService";
import type { TodosResponse } from "../api/models/TodosResponse";
import type { Todo } from "../api/models/Todo";

interface UseGetTodosOptions {
  page?: number;
  limit?: number;
  completed?: boolean;
  search?: string;
  enabled?: boolean;
}

// Type for the actual API response (differs from the specification)
interface ActualApiResponse {
  todos?: Todo[];
  pagination?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrevious?: boolean;
  };
}

export const useGetTodos = (options: UseGetTodosOptions = {}) => {
  const { page = 1, limit = 10, completed, search, enabled = true } = options;

  return useQuery<TodosResponse>({
    queryKey: ["todos", page, limit, completed, search],
    queryFn: async () => {
      const response = (await TodosService.getApiV1Todos(
        page,
        limit,
        completed,
        search
      )) as ActualApiResponse;

      // Adapter: Convert API response format to expected format
      // API returns { todos: [...], pagination: {...} }
      // Frontend expects { data: [...], pagination: {...} }
      return {
        data: response.todos || [],
        pagination: response.pagination,
      };
    },
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
};
