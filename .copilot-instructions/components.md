# React Component Architecture Rules

**File**: `.copilot-instructions/components.md`

## 🏗️ COMPONENT ARCHITECTURE RULES

### Component Guidelines

**1. Single Responsibility Principle**

- Each component should have one clear purpose
- Keep components small and focused
- Extract reusable logic into custom hooks

**2. Component Structure Template**

```typescript
// 1. Imports (external libraries first, then internal)
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Todo } from "../api";
import { useGetTodos } from "../hooks/useGetTodos";

// 2. Type definitions
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// 3. Component implementation
const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  // Component logic here
  return <div className="flex items-center p-4 bg-white rounded-lg">{/* JSX here */}</div>;
};

// 4. Default export
export default TodoItem;
```

**3. Props Interface Rules**

- Always define TypeScript interfaces for props
- Use descriptive prop names
- Prefer specific types over `any`
- Mark optional props with `?`
- Group related props in sub-interfaces when needed

### Component Types

**Reusable Components** (`src/components/`)

- UI components that can be used across features
- No business logic, only presentation
- Examples: Button, Input, Modal, Card

**Feature Components** (`src/features/`)

- Components specific to a feature or domain
- Can contain business logic and state
- Examples: TodoList, TodoItem, AddTodoForm

**Page Components** (`src/pages/`)

- Top-level components that compose features
- Handle routing and page-level state
- Examples: TodosPage, SettingsPage

### Component Composition

```typescript
// ✅ Good: Composable components
<TodoList>
  <TodoListHeader />
  <TodoListItems todos={todos} />
  <TodoListFooter />
</TodoList>

// ❌ Bad: Monolithic components
<TodoListEverything />
```

### Import Organization

```typescript
// 1. External libraries
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// 2. Internal API/types (generated)
import { Todo, TodosService } from "../api";

// 3. Internal components/hooks
import { TodoItem } from "../components/TodoItem";
import { useGetTodos } from "../hooks/useGetTodos";

// 4. Relative imports
import "./TodoList.css"; // if needed
```

### Function Declaration Style

```typescript
// ✅ Preferred: Arrow functions for components
const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return <div>{todo.title}</div>;
};

// ✅ Acceptable: Regular functions for utilities
function formatDate(date: string): string {
  return new Date(date).toLocaleDateString();
}
```

### Effect Dependencies

```typescript
// ✅ Good: Proper dependencies
useEffect(() => {
  fetchTodos();
}, [fetchTodos, page, filters]);

// ❌ Bad: Missing dependencies or empty array when not appropriate
useEffect(() => {
  fetchTodos();
}, []); // Missing dependencies
```
