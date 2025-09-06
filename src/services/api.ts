import axios, { AxiosResponse } from "axios";
import {
  Todo,
  TodosResponse,
  CreateTodoRequest,
  UpdateTodoRequest,
  HealthResponse,
  TodoFilters,
} from "../types/api";

// Configure axios instance
const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Health endpoints
export const healthApi = {
  getHealth: (): Promise<AxiosResponse<HealthResponse>> => api.get("/health"),

  getReadiness: (): Promise<AxiosResponse<HealthResponse>> =>
    api.get("/health/readiness"),

  getLiveness: (): Promise<AxiosResponse<HealthResponse>> =>
    api.get("/health/liveness"),
};

// Todo endpoints
export const todoApi = {
  // Get all todos with optional filtering and pagination
  getTodos: (filters?: TodoFilters): Promise<AxiosResponse<TodosResponse>> => {
    const params = new URLSearchParams();

    if (filters?.page) {
      params.append("page", filters.page.toString());
    }
    if (filters?.limit) {
      params.append("limit", filters.limit.toString());
    }
    if (filters?.completed !== undefined) {
      params.append("completed", filters.completed.toString());
    }
    if (filters?.search) {
      params.append("search", filters.search);
    }

    return api.get(`/todos?${params.toString()}`);
  },

  // Get a specific todo by ID
  getTodoById: (id: string): Promise<AxiosResponse<Todo>> =>
    api.get(`/todos/${id}`),

  // Create a new todo
  createTodo: (data: CreateTodoRequest): Promise<AxiosResponse<Todo>> =>
    api.post("/todos", data),

  // Update an existing todo
  updateTodo: (
    id: string,
    data: UpdateTodoRequest
  ): Promise<AxiosResponse<Todo>> => api.put(`/todos/${id}`, data),

  // Delete a todo
  deleteTodo: (id: string): Promise<AxiosResponse<void>> =>
    api.delete(`/todos/${id}`),
};

export default api;
