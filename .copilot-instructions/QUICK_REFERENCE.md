# 🚀 Todo List React - Developer Quick Reference

## 🏁 Getting Started
```bash
cd /home/lcyin/workspace/todo-list-web
npm install
npm run dev
# Open http://localhost:5173/
```

## 📁 Key Directories
- `src/api/` - 🚫 AUTO-GENERATED (don't edit)
- `src/components/` - Reusable UI components  
- `src/features/` - Feature-specific components
- `src/hooks/` - Custom React hooks
- `src/pages/` - Top-level page components

## 🛠️ Common Commands
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run lint             # Check code quality
npm run generate-api     # Regenerate API types
```

## 📝 File Naming
- Components: `PascalCase.tsx` → `TodoItem.tsx`
- Hooks: `camelCase.ts` → `useGetTodos.ts`
- Types: `PascalCase.ts` → `ApiTypes.ts`
- Utils: `camelCase.ts` → `dateUtils.ts`

## 🏗️ Component Template
```typescript
import React from 'react';
import { Todo } from '../api';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg">
      {/* Component JSX */}
    </div>
  );
};

export default TodoItem;
```

## 🔄 React Query Hook Template
```typescript
import { useQuery } from '@tanstack/react-query';
import { TodosService } from '../api';

export const useGetTodos = (params?: GetTodosParams) => {
  return useQuery({
    queryKey: ['todos', params],
    queryFn: () => TodosService.getTodos(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

## 🎨 Tailwind Class Order
```typescript
<div className="
  flex items-center justify-between  // Layout
  p-4 mb-2                          // Spacing  
  bg-white rounded-lg shadow-md     // Appearance
  hover:shadow-lg transition-shadow // Interactions
">
```

## 🔧 Troubleshooting
- **PostCSS Error**: Check `postcss.config.js` uses ES modules
- **Type Error**: Run `npm run generate-api`
- **Build Error**: Check TypeScript compilation
- **Styles Missing**: Verify Tailwind CSS import in `index.css`

## 📋 Current Sprint 1 Tasks
1. Create `src/hooks/useGetTodos.ts`
2. Create `src/components/TodoItem.tsx`  
3. Create `src/features/TodoList.tsx`
4. Update `src/pages/TodosPage.tsx`

## ⚡ Best Practices
- ✅ Use generated API types from `src/api/`
- ✅ Create custom hooks for API calls
- ✅ Handle loading and error states
- ✅ Use TypeScript interfaces for props
- ✅ Follow single responsibility principle
- ❌ Don't edit generated API files
- ❌ Don't use `any` type
- ❌ Don't mix server state with UI state
