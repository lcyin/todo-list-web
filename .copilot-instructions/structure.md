# Project Structure & File Organization

**File**: `.copilot-instructions/structure.md`

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

### File Creation Order

1. Create TypeScript interfaces/types
2. Create custom hooks for API calls
3. Create reusable components
4. Create feature-specific components
5. Update page components

### Critical Directory Rules

- **`src/api/`** - ⚠️ AUTO-GENERATED from OpenAPI spec - NEVER edit manually
- **`src/components/`** - Only reusable UI components
- **`src/features/`** - Feature-specific components that use multiple smaller components
- **`src/hooks/`** - Custom React hooks, especially for API operations
- **`src/pages/`** - Top-level page components that compose features
- **`src/types/`** - Custom TypeScript definitions (beyond generated API types)
- **`src/utils/`** - Pure utility functions with no React dependencies
