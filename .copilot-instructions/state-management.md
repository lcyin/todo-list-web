# State Management Rules

**File**: `.copilot-instructions/state-management.md`

## 🔄 STATE MANAGEMENT RULES

### Server State vs UI State

**Server State**: Use TanStack Query (`useQuery`, `useMutation`)

- Data that comes from the server
- Todo lists, user data, API responses
- Cached, synchronized, and automatically updated

**UI State**: Use React state (`useState`) or Context for shared state

- Component-level state (form inputs, modal visibility)
- Theme settings, user preferences
- Navigation state, loading indicators

**Never mix**: Don't use React state for server data

### React Query Guidelines

**Query Keys**

```typescript
// ✅ Good: Descriptive, hierarchical query keys
const { data: todos } = useQuery({
  queryKey: ["todos", { page, completed, search }],
  queryFn: () => TodosService.getTodos({ page, completed, search }),
});

// ✅ Good: Nested resource queries
const { data: todo } = useQuery({
  queryKey: ["todos", todoId],
  queryFn: () => TodosService.getTodo(todoId),
});

// ❌ Bad: Generic query keys
const { data } = useQuery({
  queryKey: ["data"],
  queryFn: getData,
});
```

**Query Configuration**

```typescript
// Standard query configuration
export const useGetTodos = (params?: GetTodosParams) => {
  return useQuery({
    queryKey: ["todos", params],
    queryFn: () => TodosService.getTodos(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};
```

**Mutation Guidelines**

```typescript
// Create mutation with cache invalidation
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

// Update mutation with optimistic updates
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoRequest }) => TodosService.updateTodo(id, data),
    onMutate: async ({ id, data }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["todos"]);

      // Optimistically update
      queryClient.setQueryData(["todos"], (old: any) => {
        // Update logic here
        return old;
      });

      return { previousTodos };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
```

### Custom Hooks Rules

**One hook per API operation**

- `useGetTodos` - for fetching todos
- `useCreateTodo` - for creating todos
- `useUpdateTodo` - for updating todos
- `useDeleteTodo` - for deleting todos

**Return object with descriptive properties**

```typescript
// ✅ Good: Descriptive return properties
export const useGetTodos = (params?: GetTodosParams) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['todos', params],
    queryFn: () => TodosService.getTodos(params),
  });

  return {
    todos: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    refetch,
  };
};

// ❌ Bad: Generic return properties
export const useGetTodos = () => {
  return useQuery({...});
};
```

**Handle loading and error states**

```typescript
// Always provide loading and error handling
export const useCreateTodo = () => {
  const mutation = useMutation({
    mutationFn: TodosService.createTodo,
    // ... other options
  });

  return {
    createTodo: mutation.mutate,
    isCreating: mutation.isLoading,
    createError: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};
```

### UI State Patterns

**Local Component State**

```typescript
const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use local state for form inputs and UI-only state
};
```

**Context for Shared UI State**

```typescript
// For theme, user preferences, etc.
const ThemeContext = createContext<{
  theme: "light" | "dark";
  toggleTheme: () => void;
}>({
  theme: "light",
  toggleTheme: () => {},
});
```
