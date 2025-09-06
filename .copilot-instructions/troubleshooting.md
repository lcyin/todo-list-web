# Troubleshooting Guide

**File**: `.copilot-instructions/troubleshooting.md`

## 🛠️ TROUBLESHOOTING GUIDE

### Common Setup Issues

#### PostCSS Configuration Errors

**Error**: `Unknown option 'from'` or ES modules errors

**Solution**:

```javascript
// postcss.config.js - Use ES modules syntax
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**Required Dependencies**:

```bash
npm install @tailwindcss/postcss autoprefixer
```

#### API Generation Issues

**Error**: `generate-api script fails` or `openapi-generator-cli not found`

**Solutions**:

1. **Install OpenAPI Generator**:

```bash
npm install @openapitools/openapi-generator-cli --save-dev
```

2. **Verify API Spec Location**:

```bash
# Ensure api-docs.json exists and is valid JSON
cat api-docs.json | jq .
```

3. **Check Generated Output**:

```bash
# Regenerate API types
npm run generate-api

# Verify generated files
ls -la src/api/
```

#### Environment Variable Issues

**Error**: `VITE_API_BASE_URL is undefined`

**Solutions**:

1. **Check Environment Files**:

```bash
# .env.development should exist
ls -la .env*

# Check content
cat .env.development
```

2. **Verify Variable Naming**:

- Must start with `VITE_` prefix
- Use in code as `import.meta.env.VITE_API_BASE_URL`

3. **Restart Development Server**:

```bash
# Environment changes require restart
npm run dev
```

### TypeScript Issues

#### Missing Type Definitions

**Error**: `Cannot find module 'X' or its corresponding type declarations`

**Solutions**:

1. **Install Type Definitions**:

```bash
npm install @types/node @types/react @types/react-dom --save-dev
```

2. **Check Import Paths**:

```typescript
// ✅ Correct relative imports
import { TodosService } from "../api";

// ❌ Incorrect absolute imports
import { TodosService } from "src/api";
```

3. **Verify Generated Types**:

```bash
# Regenerate API types if needed
npm run generate-api
```

#### Type Errors in Components

**Error**: `Property 'X' does not exist on type 'Y'`

**Common Solutions**:

1. **Define Props Interface**:

```typescript
interface TodoItemProps {
  todo: Todo;
  onUpdate?: (todo: Todo) => void;
  className?: string;
}

const TodoItem = ({ todo, onUpdate, className }: TodoItemProps) => {
  // Component implementation
};
```

2. **Use Generated Types**:

```typescript
// ✅ Use generated API types
import { Todo, CreateTodoRequest } from "../api";

// ❌ Don't create duplicate interfaces
interface MyTodo {
  id: string;
  title: string;
}
```

### React Query Issues

#### Query Not Refetching

**Issue**: Data doesn't update after mutations

**Solutions**:

1. **Proper Query Invalidation**:

```typescript
const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: TodosService.createTodo,
    onSuccess: () => {
      // Invalidate todos list
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
```

2. **Check Query Keys**:

```typescript
// Query keys must match exactly
const todosQuery = useQuery({
  queryKey: ["todos", { page: 1 }], // Must match invalidation key
  queryFn: () => TodosService.getTodos({ page: 1 }),
});
```

#### Infinite Loading States

**Issue**: Queries stuck in loading state

**Solutions**:

1. **Check API Endpoints**:

```bash
# Test API manually
curl http://localhost:3000/api/todos
```

2. **Verify Query Configuration**:

```typescript
const todosQuery = useQuery({
  queryKey: ["todos"],
  queryFn: () => TodosService.getTodos(),
  enabled: true, // Ensure query is enabled
  retry: 3, // Reasonable retry count
});
```

3. **Check Network Tab**:

- Open browser DevTools → Network
- Look for failed API requests
- Check request/response details

### API Integration Issues

#### CORS Errors

**Error**: `Access to fetch at 'API_URL' from origin 'localhost:5173' has been blocked by CORS policy`

**Solutions**:

1. **Backend Configuration** (if you control the API):

```javascript
// Express.js example
app.use(
  cors({
    origin: ["http://localhost:5173", "https://yourdomain.com"],
    credentials: true,
  })
);
```

2. **Development Proxy** (Vite configuration):

```javascript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
```

#### API Base URL Issues

**Error**: API calls going to wrong URL

**Solutions**:

1. **Check Environment Configuration**:

```typescript
// src/api/config.ts
import { OpenAPI } from "./index";

console.log("API Base URL:", import.meta.env.VITE_API_BASE_URL);
OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
```

2. **Verify Environment File**:

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000

# .env.production
VITE_API_BASE_URL=https://api.yourdomain.com
```

### Styling Issues

#### Tailwind CSS Not Working

**Issue**: Tailwind classes not applied

**Solutions**:

1. **Check CSS Import**:

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

2. **Verify Configuration**:

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  // Make sure content paths are correct
};
```

3. **PostCSS Configuration**:

```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

#### Responsive Design Issues

**Issue**: Layout breaks on different screen sizes

**Solutions**:

1. **Use Mobile-First Approach**:

```typescript
// ✅ Mobile-first responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// ❌ Desktop-first approach
<div className="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
```

2. **Test Different Breakpoints**:

```bash
# Browser DevTools → Device Toolbar
# Test: Mobile (375px), Tablet (768px), Desktop (1024px+)
```

### Development Server Issues

#### Port Already in Use

**Error**: `Port 5173 is already in use`

**Solutions**:

1. **Kill Existing Process**:

```bash
# Find process using port 5173
lsof -ti:5173

# Kill the process
kill -9 $(lsof -ti:5173)

# Or use different port
npm run dev -- --port 3001
```

2. **Check for Multiple Instances**:

```bash
# List all node processes
ps aux | grep node

# Kill specific processes if needed
pkill -f "vite"
```

#### Hot Module Replacement Not Working

**Issue**: Changes not reflected in browser

**Solutions**:

1. **Check File Watching**:

```bash
# Increase file watcher limit (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

2. **Restart Development Server**:

```bash
# Stop server (Ctrl+C) and restart
npm run dev
```

### Build Issues

#### Build Failing with Type Errors

**Error**: TypeScript errors during build

**Solutions**:

1. **Run Type Check Separately**:

```bash
# Check types without building
npm run type-check

# Fix errors before building
npm run build
```

2. **Temporary Skip (NOT RECOMMENDED)**:

```javascript
// vite.config.ts - Only for debugging
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Skip certain warnings
        if (warning.code === "UNUSED_EXTERNAL_IMPORT") return;
        warn(warning);
      },
    },
  },
});
```

#### Large Bundle Size

**Issue**: Build output too large

**Solutions**:

1. **Analyze Bundle**:

```bash
# Install bundle analyzer
npm install vite-bundle-analyzer --save-dev

# Analyze build
npm run build
npx vite-bundle-analyzer dist
```

2. **Code Splitting**:

```typescript
// Lazy load pages
const TodosPage = lazy(() => import("./pages/TodosPage"));

// Use in router
<Suspense fallback={<div>Loading...</div>}>
  <TodosPage />
</Suspense>;
```

### Performance Issues

#### Slow Initial Load

**Solutions**:

1. **Optimize Imports**:

```typescript
// ✅ Import only what you need
import { useQuery } from "@tanstack/react-query";

// ❌ Import entire library
import * as ReactQuery from "@tanstack/react-query";
```

2. **Preload Critical Resources**:

```html
<!-- index.html -->
<link rel="preload" href="/src/main.tsx" as="script" />
<link rel="preload" href="/src/index.css" as="style" />
```

#### Memory Leaks

**Issue**: Application becomes slow over time

**Solutions**:

1. **Cleanup Subscriptions**:

```typescript
useEffect(() => {
  const subscription = someObservable.subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

2. **Proper Query Cleanup**:

```typescript
// React Query automatically handles cleanup
// But for custom hooks:
useEffect(() => {
  return () => {
    queryClient.removeQueries({ queryKey: ["todos"] });
  };
}, []);
```

### Debug Tools and Commands

#### Useful Development Commands

```bash
# Type checking
npm run type-check

# Build analysis
npm run build -- --analyze

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for outdated packages
npm outdated

# Audit security issues
npm audit
```

#### Browser DevTools Usage

1. **React DevTools**: Install browser extension
2. **Network Tab**: Monitor API calls
3. **Console**: Check for JavaScript errors
4. **Performance Tab**: Analyze rendering performance
5. **Sources Tab**: Debug with breakpoints

#### VS Code Extensions for Debugging

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**
- **Auto Rename Tag**
- **Bracket Pair Colorizer**
- **Error Lens**
