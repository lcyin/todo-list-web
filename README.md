# Todo List React Application

A modern React application built with TypeScript, Vite, and Tailwind CSS for managing todo items.

## 🚀 Quick Start

```bash
# Navigate to project directory
cd /home/lcyin/workspace/todo-list-web

# Start development server
npm run dev

# Open browser to http://localhost:5173/
```

## Phase 1 - Project Setup Complete ✅

This phase established the foundation for the todo list application:

### ✅ Completed Tasks:

1. **Project Initialization**: Created Vite React-TypeScript project
2. **Dependencies Installed**: 
   - `@tanstack/react-query` for server state management
   - `axios` for HTTP requests
   - `tailwindcss` for styling
   - `openapi-typescript-codegen` for API type generation
3. **Tailwind CSS Configuration**: Setup with custom config and CSS directives
4. **Project Structure**: Created organized directory structure:
   ```
   src/
   ├── api/          # Generated API client and types
   ├── components/   # Reusable UI components
   ├── features/     # Feature-specific components
   ├── hooks/        # Custom hooks
   ├── pages/        # Top-level page components
   ├── types/        # TypeScript type definitions
   └── utils/        # Utility functions
   ```
5. **API Type Generation**: Generated TypeScript types from `api-docs.json`
6. **Environment Configuration**: Setup environment variables for API base URL
7. **Project Structure**: ✅ **Moved to root directory** (September 6, 2025)

### 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate-api` - Regenerate API types from OpenAPI spec
- `npm run lint` - Run ESLint

### ⏭️ Next Steps (Phase 2)

Ready to begin Sprint 1: Read & Display Todos
- Create `useGetTodos` hook with React Query
- Build `TodoItem` and `TodoList` components
- Implement basic todo list display with loading and error states

---

**Phase 1 Status**: ✅ **COMPLETE** - Foundation established and ready for feature development!
**Project Location**: Root directory (`/home/lcyin/workspace/todo-list-web/`)
**Development Server**: http://localhost:5173/

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate-api` - Regenerate API types from OpenAPI spec
- `npm run lint` - Run ESLint

### ⏭️ Next Steps (Phase 2):

Ready to begin Sprint 1: Read & Display Todos
- Create `useGetTodos` hook with React Query
- Build `TodoItem` and `TodoList` components
- Implement basic todo list display with loading and error states

---

**Phase 1 Status**: ✅ **COMPLETE** - Foundation established and ready for feature development!

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
