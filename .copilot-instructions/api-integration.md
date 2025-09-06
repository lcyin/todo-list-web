# API Integration Rules

**File**: `.copilot-instructions/api-integration.md`

## 🔧 API INTEGRATION RULES

### Generated API Client

**⚠️ CRITICAL RULES:**

- **NEVER edit files in `src/api/`** - they are auto-generated
- **ALWAYS regenerate** after API changes: `npm run generate-api`
- **USE the generated types** - don't create duplicate interfaces

### API Client Configuration

The API client is configured in `src/api/config.ts`:

```typescript
import { OpenAPI } from "./index";

// Configure the API client with the base URL from environment variables
OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export { OpenAPI };
```

### Custom Hooks for API Calls

**File Organization Pattern**

```typescript
// src/hooks/useGetTodos.ts
import { useQuery } from "@tanstack/react-query";
import { TodosService } from "../api";

export const useGetTodos = (params?: GetTodosParams) => {
  return useQuery({
    queryKey: ["todos", params],
    queryFn: () => TodosService.getTodos(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

**Query Hooks Pattern**

```typescript
// For GET requests - use useQuery
export const useGetTodos = (params?: { page?: number; completed?: boolean; search?: string }) => {
  return useQuery({
    queryKey: ["todos", params],
    queryFn: () => TodosService.getTodos(params),
    enabled: true, // Set to false if you want manual triggering
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetTodo = (id: string) => {
  return useQuery({
    queryKey: ["todos", id],
    queryFn: () => TodosService.getTodo(id),
    enabled: !!id, // Only run if id exists
  });
};
```

**Mutation Hooks Pattern**

```typescript
// For POST, PUT, DELETE requests - use useMutation
export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TodosService.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Failed to create todo:", error);
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoRequest }) => TodosService.updateTodo(id, data),
    onSuccess: (data, variables) => {
      // Update specific todo in cache
      queryClient.setQueryData(["todos", variables.id], data);
      // Invalidate the todos list
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TodosService.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
```

### Error Handling

**Component Level Error Handling**

```typescript
const TodoList = () => {
  const { todos, isLoading, error } = useGetTodos();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
```

**Global Error Handling**

```typescript
// In React Query configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      onError: (error) => {
        // Global error handling
        console.error("Mutation error:", error);
        // Show toast notification, etc.
      },
    },
  },
});
```

### Environment Configuration

**Development vs Production**

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000

# .env.production
VITE_API_BASE_URL=https://api.todolist.com
```

### API Response Patterns

**Use Generated Types**

```typescript
// ✅ Good: Use generated types
import { Todo, TodosResponse, CreateTodoRequest } from "../api";

const createTodo = async (data: CreateTodoRequest): Promise<Todo> => {
  const response = await TodosService.createTodo(data);
  return response.data;
};

// ❌ Bad: Creating duplicate interfaces
interface MyTodo {
  id: string;
  title: string;
  // ... duplicating the generated Todo type
}
```

### Cache Management

**Query Invalidation Patterns**

```typescript
// Invalidate all todos queries
queryClient.invalidateQueries({ queryKey: ["todos"] });

// Invalidate specific todo
queryClient.invalidateQueries({ queryKey: ["todos", todoId] });

// Invalidate with specific filters
queryClient.invalidateQueries({
  queryKey: ["todos"],
  predicate: (query) => {
    return query.queryKey[0] === "todos" && query.queryKey[1]?.completed === true;
  },
});
```

**Manual Cache Updates**

```typescript
// Update cache directly for immediate UI updates
queryClient.setQueryData(["todos", todoId], updatedTodo);

// Update list cache after creating new todo
queryClient.setQueryData(["todos"], (oldData: TodosResponse) => ({
  ...oldData,
  data: [...oldData.data, newTodo],
  pagination: {
    ...oldData.pagination,
    total: oldData.pagination.total + 1,
  },
}));
```
