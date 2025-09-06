# Todo List React Project - Rules & Instructions

**Project**: Todo List React Application  
**Version**: 1.2  
**Created**: September 6, 2025  
**Location**: `/home/lcyin/workspace/todo-list-web/`

---

## 📋 PROJECT OVERVIEW

This is a modern React application built with TypeScript, Vite, and Tailwind CSS for managing todo items. The project follows a component-based architecture with strict type safety and modern development practices.

**Tech Stack:**
- React 19+ with TypeScript
- Vite for development and building
- Tailwind CSS for styling
- TanStack Query (React Query) for server state management
- Axios for HTTP requests
- OpenAPI code generation for type safety

---

## 🗂️ PROJECT STRUCTURE RULES

### Directory Organization
```
src/
├── api/          # ⚠️  AUTO-GENERATED - DO NOT EDIT MANUALLY
├── components/   # Reusable UI components only
├── features/     # Feature-specific components (TodoList, etc.)
├── hooks/        # Custom React hooks
├── pages/        # Top-level page components
├── types/        # Custom TypeScript type definitions
└── utils/        # Pure utility functions
```

### File Naming Conventions

**Components**: Use PascalCase with `.tsx` extension
- ✅ `TodoItem.tsx`
- ✅ `TodoList.tsx`
- ❌ `todoItem.tsx`
- ❌ `todo-item.tsx`

**Hooks**: Use camelCase starting with `use`
- ✅ `useGetTodos.ts`
- ✅ `useCreateTodo.ts`
- ❌ `getTodos.ts`
- ❌ `use-todos.ts`

**Types**: Use PascalCase with `.ts` extension
- ✅ `ApiTypes.ts`
- ✅ `ComponentProps.ts`

**Utils**: Use camelCase with `.ts` extension
- ✅ `dateUtils.ts`
- ✅ `apiHelpers.ts`

---

## 🏗️ ARCHITECTURE RULES

### Component Guidelines

**1. Single Responsibility Principle**
- Each component should have one clear purpose
- Keep components small and focused
- Extract reusable logic into custom hooks

**2. Component Structure**
```typescript
// 1. Imports (external libraries first, then internal)
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Todo } from '../api';
import { useGetTodos } from '../hooks/useGetTodos';

// 2. Type definitions
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

// 3. Component implementation
const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  // Component logic here
  return (
    // JSX here
  );
};

// 4. Default export
export default TodoItem;
```

**3. Props Interface Rules**
- Always define TypeScript interfaces for props
- Use descriptive prop names
- Prefer specific types over `any`
- Mark optional props with `?`

### State Management Rules

**1. Server State vs UI State**
- **Server State**: Use TanStack Query (`useQuery`, `useMutation`)
- **UI State**: Use React state (`useState`) or Context for shared state
- **Never mix**: Don't use React state for server data

**2. React Query Guidelines**
```typescript
// ✅ Good: Descriptive query keys
const { data: todos } = useQuery({
  queryKey: ['todos', { page, completed, search }],
  queryFn: () => TodosService.getTodos({ page, completed, search })
});

// ❌ Bad: Generic query keys
const { data } = useQuery({
  queryKey: ['data'],
  queryFn: getData
});
```

**3. Custom Hooks Rules**
- One hook per API operation
- Return object with descriptive properties
- Handle loading and error states
- Use React Query for server state

---

## 🎨 STYLING RULES

### Tailwind CSS Guidelines

**1. Class Organization**
```typescript
// ✅ Good: Logical grouping
<div className="
  flex items-center justify-between
  p-4 mb-2
  bg-white rounded-lg shadow-md
  hover:shadow-lg transition-shadow
">

// ❌ Bad: Random order
<div className="p-4 flex bg-white hover:shadow-lg items-center mb-2 rounded-lg shadow-md justify-between transition-shadow">
```

**2. Responsive Design**
- Mobile-first approach
- Use responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`
- Test on multiple screen sizes

**3. Color and Spacing**
- Use Tailwind's predefined colors and spacing
- Avoid arbitrary values unless absolutely necessary
- Maintain consistency across components

---

## 🔧 API INTEGRATION RULES

### Generated API Client

**⚠️ CRITICAL RULES:**
- **NEVER edit files in `src/api/`** - they are auto-generated
- **ALWAYS regenerate** after API changes: `npm run generate-api`
- **USE the generated types** - don't create duplicate interfaces

### Custom Hooks for API Calls

**1. File Organization**
```typescript
// src/hooks/useGetTodos.ts
export const useGetTodos = (params?: GetTodosParams) => {
  return useQuery({
    queryKey: ['todos', params],
    queryFn: () => TodosService.getTodos(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

**2. Mutation Hooks**
```typescript
// src/hooks/useCreateTodo.ts
export const useCreateTodo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: TodosService.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
```

**3. Error Handling**
- Always handle error states in components
- Provide user-friendly error messages
- Log errors for debugging

---

## 🧪 DEVELOPMENT WORKFLOW

### Before Starting Development

**1. Environment Setup**
```bash
cd /home/lcyin/workspace/todo-list-web
npm install
npm run dev
```

**2. Check Dependencies**
- Ensure all required packages are installed
- Verify TypeScript configuration
- Test that Tailwind CSS is working

### During Development

**1. File Creation Order**
1. Create TypeScript interfaces/types
2. Create custom hooks for API calls
3. Create reusable components
4. Create feature-specific components
5. Update page components

**2. Testing as You Go**
- Test each component in isolation
- Verify API integration works
- Check responsive design
- Test error states

**3. Code Quality Checks**
```bash
npm run lint        # Check ESLint rules
npm run build       # Verify TypeScript compilation
```

### Git Workflow

**1. Commit Guidelines**
- Use conventional commit messages
- Commit frequently with small, focused changes
- Always test before committing

**2. Branch Strategy** (if using branches)
- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - Feature development

---

## 📝 CODING STANDARDS

### TypeScript Rules

**1. Type Safety**
```typescript
// ✅ Good: Explicit types
interface CreateTodoData {
  title: string;
  description?: string;
  completed: boolean;
}

// ❌ Bad: Using any
const createTodo = (data: any) => { ... }
```

**2. Import Organization**
```typescript
// 1. External libraries
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal API/types (generated)
import { Todo, TodosService } from '../api';

// 3. Internal components/hooks
import { TodoItem } from '../components/TodoItem';
import { useGetTodos } from '../hooks/useGetTodos';

// 4. Relative imports
import './TodoList.css'; // if needed
```

**3. Function Declaration Style**
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

### React Best Practices

**1. Component Composition**
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

**2. Effect Dependencies**
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

---

## 🚀 DEPLOYMENT PREPARATION

### Build Process
```bash
npm run build       # Create production build
npm run preview     # Test production build locally
```

### Environment Configuration
- **Development**: Uses `.env.development`
- **Production**: Uses `.env.production`
- **API Base URL**: Configured via `VITE_API_BASE_URL`

### Pre-deployment Checklist
- [ ] All tests pass
- [ ] ESLint reports no errors
- [ ] TypeScript compiles without errors
- [ ] Build process completes successfully
- [ ] Environment variables are properly configured
- [ ] API endpoints are accessible

---

## 🆘 TROUBLESHOOTING GUIDE

### Common Issues

**1. PostCSS Configuration Error**
```bash
# If you see PostCSS module errors:
npm install @tailwindcss/postcss
# Ensure postcss.config.js uses ES modules syntax
```

**2. TypeScript Compilation Errors**
```bash
# Regenerate API types if schema changed:
npm run generate-api

# Clear TypeScript cache:
rm -rf node_modules/.cache
npm install
```

**3. Development Server Issues**
```bash
# Clear Vite cache:
rm -rf node_modules/.vite
npm run dev
```

**4. Styling Not Applied**
- Check Tailwind CSS is properly imported in `src/index.css`
- Verify PostCSS configuration
- Check for CSS conflicts

### Getting Help

**1. Documentation References**
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)

**2. Debugging Tools**
- React Developer Tools
- React Query Developer Tools
- Browser DevTools

---

## 📚 PHASE-SPECIFIC GUIDELINES

### Current Phase: Sprint 1 - Read & Display Todos

**Next Tasks:**
1. Create `src/hooks/useGetTodos.ts`
2. Create `src/components/TodoItem.tsx`
3. Create `src/features/TodoList.tsx`
4. Update `src/pages/TodosPage.tsx`

**File Creation Template for Sprint 1:**
```typescript
// src/hooks/useGetTodos.ts
import { useQuery } from '@tanstack/react-query';
import { TodosService } from '../api';

export const useGetTodos = (params?: { page?: number; completed?: boolean; search?: string }) => {
  return useQuery({
    queryKey: ['todos', params],
    queryFn: () => TodosService.getTodos(params),
    staleTime: 5 * 60 * 1000,
  });
};
```

### Future Phases

**Sprint 2**: Focus on Create & Delete operations
**Sprint 3**: Add Update functionality and filtering
**Phase 3**: UI/UX improvements and responsive design
**Phase 4**: Testing and quality assurance
**Phase 5**: Production deployment

---

**🎯 Remember: Follow these rules consistently to maintain code quality, type safety, and project organization throughout development!**
