# Styling Rules

**File**: `.copilot-instructions/styling.md`

## 🎨 STYLING RULES

### Tailwind CSS Configuration

**Installation and Setup**

The project uses Tailwind CSS for utility-first styling with PostCSS configuration.

**Configuration Files**

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```javascript
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Design System

**Color Palette**

- Use Tailwind's default color palette
- Extend colors in `tailwind.config.js` for brand-specific colors
- Use semantic color names for better maintainability

**Typography**

- Use Tailwind's typography utilities
- Consistent font sizes across components
- Proper line height and letter spacing

**Spacing**

- Use Tailwind's spacing scale (4px increments)
- Consistent margins and padding
- Responsive spacing with breakpoint prefixes

### Component Styling Patterns

**Layout Components**

```typescript
// Container pattern
const Container = ({ children, className = "" }: ContainerProps) => {
  return <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
};

// Card pattern
const Card = ({ children, className = "" }: CardProps) => {
  return <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>{children}</div>;
};
```

**Button Variants**

```typescript
// Button component with variants
const Button = ({ variant = "primary", size = "md", children, ...props }: ButtonProps) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-md transition-colors";

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]}`} {...props}>
      {children}
    </button>
  );
};
```

**Form Elements**

```typescript
// Input component
const Input = ({ label, error, className = "", ...props }: InputProps) => {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <input
        className={`
          block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? "border-red-300 focus:ring-red-500 focus:border-red-500" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};
```

### Responsive Design

**Breakpoint Strategy**

- Mobile-first approach
- Use Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Test on different screen sizes

**Grid and Flexbox**

```typescript
// Responsive grid layout
const TodoGrid = ({ todos }: TodoGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

// Responsive flexbox layout
const Header = () => {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4">
      <h1 className="text-2xl font-bold mb-4 sm:mb-0">Todo List</h1>
      <nav className="flex space-x-4">
        <Button>Add Todo</Button>
        <Button variant="secondary">Settings</Button>
      </nav>
    </header>
  );
};
```

### State-Based Styling

**Conditional Classes**

```typescript
// Using clsx for conditional classes
import clsx from "clsx";

const TodoItem = ({ todo, isSelected }: TodoItemProps) => {
  return (
    <div
      className={clsx("p-4 border rounded-lg transition-colors", {
        "bg-blue-50 border-blue-200": isSelected,
        "bg-white border-gray-200": !isSelected,
        "opacity-50": todo.completed,
      })}
    >
      {todo.title}
    </div>
  );
};
```

**Loading and Error States**

```typescript
// Loading skeleton
const TodoSkeleton = () => {
  return (
    <div className="animate-pulse p-4 border rounded-lg">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

// Error state
const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-800">{message}</p>
        </div>
      </div>
    </div>
  );
};
```

### Animation and Transitions

**Hover Effects**

```typescript
// Interactive elements
const InteractiveCard = ({ children }: InteractiveCardProps) => {
  return (
    <div
      className="
      transform transition-all duration-200 
      hover:scale-105 hover:shadow-lg 
      cursor-pointer
    "
    >
      {children}
    </div>
  );
};
```

**Page Transitions**

```typescript
// Fade in animation
const FadeIn = ({ children, delay = 0 }: FadeInProps) => {
  return (
    <div className="animate-fade-in opacity-0" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};
```

### Dark Mode Support

**Theme Configuration**

```javascript
// tailwind.config.js with dark mode
export default {
  darkMode: "class", // or 'media'
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark mode colors
        dark: {
          bg: "#1a1a1a",
          surface: "#2d2d2d",
          text: "#ffffff",
        },
      },
    },
  },
  plugins: [],
};
```

**Dark Mode Classes**

```typescript
// Component with dark mode support
const Card = ({ children }: CardProps) => {
  return (
    <div
      className="
      bg-white dark:bg-dark-surface 
      text-gray-900 dark:text-dark-text
      border border-gray-200 dark:border-gray-700
      rounded-lg shadow-md
    "
    >
      {children}
    </div>
  );
};
```

### Performance Considerations

**CSS Optimization**

- Use PurgeCSS (built into Tailwind) to remove unused styles
- Minimize custom CSS
- Use Tailwind's utilities instead of writing custom CSS

**Critical CSS**

- Inline critical CSS for above-the-fold content
- Use proper loading strategies for fonts and icons

### Best Practices

**Utility Classes**

- Use descriptive utility combinations
- Extract common patterns into components
- Keep utility classes readable and maintainable

**Component Composition**

- Build reusable styled components
- Use composition over inheritance
- Keep styling logic close to the component

**Maintenance**

- Document custom utility classes
- Use consistent naming conventions
- Regular design system audits
