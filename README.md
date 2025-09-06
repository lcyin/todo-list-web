# Todo List Web Application

A modern, responsive React application for managing todo lists, built with TypeScript and Vite. This frontend consumes the Todo List API defined in `api-docs.json`.

## Features

- ✅ **Complete Todo Management**: Create, read, update, and delete todos
- 🔍 **Advanced Filtering**: Filter by completion status and search through titles/descriptions
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 📄 **Pagination**: Efficiently handle large lists of todos
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development and optimized builds
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations
- 🔧 **TypeScript**: Full type safety throughout the application

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API communication
- **CSS3** - Modern styling with Flexbox and Grid

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Todo List API server running (see `api-docs.json` for API specification)

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

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3001`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

This application is designed to work with the Todo List API defined in `api-docs.json`. The API should be running on `http://localhost:3000` by default.

### API Endpoints Used

- `GET /api/v1/todos` - Get all todos with pagination and filtering
- `POST /api/v1/todos` - Create a new todo
- `GET /api/v1/todos/{id}` - Get a specific todo
- `PUT /api/v1/todos/{id}` - Update a todo
- `DELETE /api/v1/todos/{id}` - Delete a todo
- `GET /api/v1/health` - Health check

## Project Structure

```
src/
├── components/          # React components
│   ├── TodoList.tsx    # Main todo list component
│   ├── TodoItem.tsx    # Individual todo item
│   ├── TodoForm.tsx    # Form for creating todos
│   ├── Filters.tsx     # Search and filter controls
│   └── Pagination.tsx  # Pagination component
├── hooks/              # Custom React hooks
│   └── useTodos.ts     # Todo management hook
├── services/           # API service layer
│   └── api.ts          # Axios configuration and API calls
├── types/              # TypeScript type definitions
│   └── api.ts          # API-related types
├── App.tsx             # Main App component
├── main.tsx            # Application entry point
├── App.css             # Component styles
└── index.css           # Global styles
```

## Features in Detail

### Todo Management
- Create todos with title and optional description
- Mark todos as complete/incomplete
- Edit todo titles and descriptions inline
- Delete todos with confirmation

### Filtering and Search
- Search todos by title and description
- Filter by completion status (all, pending, completed)
- Adjustable items per page (5, 10, 25, 50)

### Pagination
- Navigate through pages of todos
- Shows current page and total pages
- First, Previous, Next, Last navigation buttons

### Responsive Design
- Mobile-first approach
- Optimized layouts for different screen sizes
- Touch-friendly interface elements

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Configuration

### API Base URL
The API base URL is configured in `vite.config.ts` as a proxy to `http://localhost:3000`. Update this if your API server runs on a different port.

### Environment Variables
Create a `.env` file to override default settings:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
