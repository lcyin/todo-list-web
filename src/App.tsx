import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./api/config"; // Initialize API configuration
import TodosPage from "./pages/TodosPage";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <TodosPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
