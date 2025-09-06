# Todo List React Application

A modern, responsive React single-page application (SPA) that serves as a frontend for the Todo List API. This application provides a user-friendly interface for managing todo items with full CRUD (Create, Read, Update, Delete) functionality.

## Features

- ✅ View and manage todo items
- ✅ Create new todos
- ✅ Mark todos as completed/incomplete
- ✅ Edit existing todos
- ✅ Delete todos
- ✅ Search and filter todos
- ✅ Pagination support
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Real-time updates with optimistic UI

## Technology Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query (React Query) for server state
- **HTTP Client**: Axios
- **Testing**: Vitest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd todo-list-web
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.development
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```text
src/
├── api/              # API client and hooks
├── components/       # Reusable UI components
├── features/         # Feature-specific components
├── hooks/           # Custom hooks
├── pages/           # Top-level page components
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
├── App.tsx
└── main.tsx
```

## API Integration

This application integrates with the Todo List API. See `api-docs.json` for the complete API specification.

## Development Plan

For detailed development phases and implementation strategy, see [development-plan.md](./development-plan.md).

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
