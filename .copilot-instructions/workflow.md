# Development Workflow

**File**: `.copilot-instructions/workflow.md`

## 🔄 DEVELOPMENT WORKFLOW

### Project Setup Workflow

#### Initial Project Creation

1. **Create Vite React TypeScript project**
2. **Install core dependencies**
3. **Configure Tailwind CSS with PostCSS**
4. **Set up API client generation**
5. **Configure environment variables**
6. **Create basic project structure**

#### Daily Development Workflow

```bash
# Start development server
npm run dev

# Generate API types (after API changes)
npm run generate-api

# Run type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

### Feature Development Process

#### Sprint Planning Approach

**Phase Structure**

- **Phase 1**: Project Setup & Configuration
- **Sprint 1**: Read & Display Todos (GET operations)
- **Sprint 2**: Create & Edit Todos (POST/PUT operations)
- **Sprint 3**: Advanced Features (filters, search, pagination)

#### Feature Implementation Steps

1. **Plan the Feature**

   - Define requirements and acceptance criteria
   - Identify required API endpoints
   - Plan component structure

2. **API Integration**

   - Ensure API types are up-to-date: `npm run generate-api`
   - Create custom hooks for API calls
   - Test API integration in isolation

3. **Component Development**

   - Create components following naming conventions
   - Implement UI with Tailwind CSS
   - Add proper TypeScript types

4. **State Management**

   - Implement React Query patterns
   - Handle loading and error states
   - Manage cache invalidation

5. **Testing & Validation**
   - Test component functionality
   - Verify responsive design
   - Check error handling

### Code Review Guidelines

#### Self-Review Checklist

**Before Committing Code**

- [ ] TypeScript types are properly defined
- [ ] No TypeScript errors or warnings
- [ ] Components follow naming conventions
- [ ] Proper error handling implemented
- [ ] Responsive design works on different screen sizes
- [ ] API integration uses generated types
- [ ] React Query patterns are correctly implemented

#### Code Quality Standards

**TypeScript Standards**

- All props interfaces defined
- No `any` types used
- Proper type imports and exports
- Type-safe API calls

**React Standards**

- Functional components with hooks
- Proper component composition
- Consistent prop naming
- Error boundaries where needed

**Styling Standards**

- Tailwind CSS utilities used
- Responsive design implemented
- Consistent spacing and typography
- Proper color usage

### Git Workflow

#### Branch Naming Convention

```bash
# Feature branches
feature/todo-list-component
feature/create-todo-form

# Bug fix branches
bugfix/todo-update-error

# Enhancement branches
enhancement/loading-states
```

#### Commit Message Format

```bash
# Format: <type>(<scope>): <description>

feat(todos): add TodoList component with basic rendering
fix(api): handle error response in useGetTodos hook
style(todos): improve responsive layout for mobile
refactor(hooks): extract common query options
docs(readme): update development setup instructions
```

#### Development Flow

```bash
# Create feature branch
git checkout -b feature/todo-list-component

# Make changes and commit
git add .
git commit -m "feat(todos): add TodoList component with basic rendering"

# Push branch
git push origin feature/todo-list-component

# Create pull request
# Review and merge
```

### Environment Management

#### Development Environment

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:3000
VITE_APP_ENV=development
```

#### Production Environment

```bash
# .env.production
VITE_API_BASE_URL=https://api.todolist.com
VITE_APP_ENV=production
```

### Error Handling Workflow

#### Development Error Resolution

1. **TypeScript Errors**

   - Fix type definitions first
   - Ensure proper imports
   - Update generated API types if needed

2. **Runtime Errors**

   - Check browser console
   - Verify API endpoints
   - Test error boundaries

3. **Build Errors**
   - Run type check: `npm run type-check`
   - Check for missing dependencies
   - Verify environment configuration

#### Production Error Monitoring

- Set up error tracking (e.g., Sentry)
- Monitor API response errors
- Track user interaction errors
- Implement proper fallback UI

### Performance Optimization Workflow

#### Development Performance

- Use React DevTools for component analysis
- Monitor bundle size with Vite analyzer
- Optimize API call patterns
- Implement proper caching strategies

#### Production Performance

- Analyze build output
- Optimize asset loading
- Implement code splitting
- Monitor Core Web Vitals

### Deployment Workflow

#### Build Process

```bash
# Install dependencies
npm ci

# Generate API types
npm run generate-api

# Type check
npm run type-check

# Build production
npm run build

# Test production build
npm run preview
```

#### Deployment Steps

1. **Pre-deployment Checks**

   - All tests passing
   - No TypeScript errors
   - Environment variables configured
   - API endpoints accessible

2. **Build & Deploy**

   - Generate optimized build
   - Deploy to hosting platform
   - Verify deployment

3. **Post-deployment Verification**
   - Test core functionality
   - Check API connectivity
   - Monitor error rates

### Troubleshooting Workflow

#### Common Issues Resolution

**API Integration Issues**

1. Verify API base URL in environment
2. Check generated types are up-to-date
3. Test API endpoints directly
4. Review network requests in browser

**TypeScript Issues**

1. Run `npm run type-check`
2. Check import/export statements
3. Verify interface definitions
4. Update dependencies if needed

**Styling Issues**

1. Check Tailwind CSS configuration
2. Verify PostCSS setup
3. Test responsive breakpoints
4. Review component class names

### Documentation Workflow

#### Code Documentation

- Add JSDoc comments for complex functions
- Document component props interfaces
- Include usage examples in comments
- Keep README.md updated

#### Project Documentation

- Update development plan after each sprint
- Document API changes
- Maintain troubleshooting guide
- Keep setup instructions current

### Continuous Improvement

#### Regular Maintenance Tasks

**Weekly**

- Update dependencies
- Review and refactor code
- Update documentation
- Performance analysis

**Monthly**

- Security audit
- Bundle size optimization
- Code quality review
- Architecture assessment
