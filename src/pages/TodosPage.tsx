import React from "react";
import { useGetTodos } from "../hooks/useGetTodos";

const TodosPage: React.FC = () => {
  const { data, isLoading, error } = useGetTodos();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Todo List</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        {isLoading && <p className="text-gray-600">Loading todos...</p>}

        {error && <p className="text-red-600">Error loading todos: {error.message}</p>}

        {data && (
          <div>
            <p className="text-green-600 mb-4">
              ✅ useGetTodos hook working! Found {data.data?.length || 0} todos.
            </p>
            <p className="text-gray-600">Todo list application is ready! Phase 1 setup complete.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodosPage;
