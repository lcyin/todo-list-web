// API Types based on OpenAPI specification
export interface Todo {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string | null;
  completed?: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export interface TodosResponse {
  todos: Todo[];
  pagination: Pagination;
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: object;
  };
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  message: string;
}

// Additional types for the React app
export interface TodoFilters {
  completed?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface AppState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  pagination: Pagination | null;
  filters: TodoFilters;
}
