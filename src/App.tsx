import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./components";
import "./api/config"; // Initialize API configuration
import TodosPage from "./pages/TodosPage";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <div className="min-h-screen bg-gray-50">
          <TodosPage />
        </div>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
