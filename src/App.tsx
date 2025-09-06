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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10">
            <TodosPage />
          </div>
        </div>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
