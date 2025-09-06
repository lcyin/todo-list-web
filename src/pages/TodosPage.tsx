import React, { useState } from "react";
import { TodoList, AddTodoForm } from "../components";
import { useCreateTodo, useDeleteTodo, useToast } from "../hooks";
import type { CreateTodoRequest } from "../api/models/CreateTodoRequest";

const TodosPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCompleted, setFilterCompleted] = useState<boolean | undefined>(undefined);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);

  const createTodoMutation = useCreateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const { showToast } = useToast();

  const handleToggleComplete = (id: string) => {
    // TODO: Implement toggle complete functionality
    console.log("Toggle complete for todo:", id);
  };

  const handleEdit = (id: string) => {
    // TODO: Implement edit functionality
    console.log("Edit todo:", id);
  };

  const handleDelete = (id: string) => {
    setDeletingTodoId(id);
    deleteTodoMutation.mutate(id, {
      onSuccess: () => {
        setDeletingTodoId(null);
        showToast("success", "Todo deleted successfully!");
      },
      onError: (error) => {
        setDeletingTodoId(null);
        console.error("Failed to delete todo:", error);
        showToast("error", "Failed to delete todo. Please try again.");
      },
    });
  };

  const handleAddTodo = () => {
    setShowAddForm(!showAddForm);
  };

  const handleCreateTodo = (todoData: CreateTodoRequest) => {
    createTodoMutation.mutate(todoData, {
      onSuccess: () => {
        setShowAddForm(false);
        showToast("success", "Todo created successfully!");
      },
      onError: (error) => {
        console.error("Failed to create todo:", error);
        showToast("error", "Failed to create todo. Please try again.");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-1">My Todo List</h1>
              <p className="text-gray-600 text-lg">Organize your tasks and stay productive</p>
            </div>
            <button
              onClick={handleAddTodo}
              className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d={showAddForm ? "M6 18L18 6M6 6l12 12" : "M12 6v6m0 0v6m0-6h6m-6 0H6"}
                />
              </svg>
              <span>{showAddForm ? "Cancel" : "Add Todo"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Add Todo Form */}
        {showAddForm && (
          <AddTodoForm onSubmit={handleCreateTodo} isLoading={createTodoMutation.isPending} />
        )}

        {/* Enhanced Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between space-y-6 md:space-y-0 md:space-x-8">
            {/* Enhanced Search */}
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-3">
                Search todos
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="search"
                  placeholder="Search by title or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Enhanced Filter */}
            <div className="md:w-64">
              <label htmlFor="filter" className="block text-sm font-semibold text-gray-700 mb-3">
                Filter by status
              </label>
              <select
                id="filter"
                value={
                  filterCompleted === undefined ? "all" : filterCompleted ? "completed" : "pending"
                }
                onChange={(e) => {
                  const value = e.target.value;
                  setFilterCompleted(value === "all" ? undefined : value === "completed");
                }}
                className="block w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all duration-200"
              >
                <option value="all">All todos</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Todo List */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <TodoList
            search={searchQuery || undefined}
            completed={filterCompleted}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deletingTodoId={deletingTodoId}
          />
        </div>
      </main>
    </div>
  );
};

export default TodosPage;
