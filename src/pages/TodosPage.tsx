import React, { useState } from "react";
import { TodoList, AddTodoForm } from "../components";
import { useCreateTodo, useDeleteTodo, useUpdateTodo, useToast, useDebounce } from "../hooks";
import type { CreateTodoRequest } from "../api/models/CreateTodoRequest";
import type { UpdateTodoRequest } from "../api/models/UpdateTodoRequest";
import type { Todo } from "../api/models/Todo";

const TodosPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCompleted, setFilterCompleted] = useState<boolean | undefined>(undefined);
  const [showAddForm, setShowAddForm] = useState(false);
  const [deletingTodoId, setDeletingTodoId] = useState<string | null>(null);
  const [updatingTodoId, setUpdatingTodoId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Debounce search query to avoid excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300); // 300ms delay

  const createTodoMutation = useCreateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const updateTodoMutation = useUpdateTodo();
  const { showToast } = useToast();

  const handleToggleComplete = (todo: Todo) => {
    updateTodoMutation.mutate(
      {
        id: todo.id,
        data: { completed: !todo.completed },
      },
      {
        onSuccess: () => {
          showToast("success", `Todo marked as ${!todo.completed ? "completed" : "pending"}!`);
        },
        onError: (error) => {
          console.error("Failed to update todo:", error);
          showToast("error", "Failed to update todo. Please try again.");
        },
      }
    );
  };

  const handleEdit = (id: string, data: UpdateTodoRequest) => {
    setUpdatingTodoId(id);
    updateTodoMutation.mutate(
      { id, data },
      {
        onSuccess: () => {
          setUpdatingTodoId(null);
          showToast("success", "Todo updated successfully!");
        },
        onError: (error) => {
          setUpdatingTodoId(null);
          console.error("Failed to update todo:", error);
          showToast("error", "Failed to update todo. Please try again.");
        },
      }
    );
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset to first page when search or filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, filterCompleted]);

  return (
    <div className="min-h-screen relative">
      {/* Enhanced Header with improved styling */}
      <header className="bg-white/80 backdrop-blur-lg shadow-xl border-b border-white/50 sticky top-0 z-20">
        <div className="container mx-auto px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  My Todo List
                </h1>
              </div>
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl font-medium ml-16">
                Organize your tasks and stay productive ✨
              </p>
            </div>
            <button
              onClick={handleAddTodo}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:from-blue-800 active:to-indigo-800 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-2xl font-bold transition-all duration-300 flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto justify-center sm:justify-start"
              aria-expanded={showAddForm}
              aria-controls="add-todo-form"
              aria-label={showAddForm ? "Cancel adding new todo" : "Add new todo"}
            >
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 ${
                  showAddForm ? "rotate-45" : ""
                }`}
              >
                <svg
                  className="w-full h-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d={showAddForm ? "M12 6v6m0 0v6m0-6h6m-6 0H6" : "M12 6v6m0 0v6m0-6h6m-6 0H6"}
                  />
                </svg>
              </div>
              <span className="text-lg">{showAddForm ? "Cancel" : "Add Todo"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Add Todo Form */}
        {showAddForm && (
          <div id="add-todo-form" role="region" aria-labelledby="add-todo-heading">
            <AddTodoForm onSubmit={handleCreateTodo} isLoading={createTodoMutation.isPending} />
          </div>
        )}

        {/* Enhanced Filters and Search */}
        <section
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10 relative overflow-hidden"
          role="search"
          aria-labelledby="search-filters-heading"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-indigo-50/40 rounded-3xl"></div>

          <div className="relative z-10">
            <h2
              id="search-filters-heading"
              className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
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
              <span>Search & Filter</span>
            </h2>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Enhanced Search */}
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-bold text-gray-700 mb-3">
                  Search todos
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
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
                    className="block w-full pl-14 pr-12 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm hover:bg-white/80"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
              <div className="lg:w-72">
                <label htmlFor="filter" className="block text-sm font-bold text-gray-700 mb-3">
                  Filter by status
                </label>
                <select
                  id="filter"
                  value={
                    filterCompleted === undefined
                      ? "all"
                      : filterCompleted
                      ? "completed"
                      : "pending"
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    setFilterCompleted(value === "all" ? undefined : value === "completed");
                  }}
                  className="block w-full px-5 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white/70 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 cursor-pointer"
                >
                  <option value="all">All todos</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Todo List */}
        <section
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 sm:p-8 lg:p-10 relative overflow-hidden"
          aria-labelledby="todo-list-heading"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 to-purple-50/40 rounded-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h2 id="todo-list-heading" className="text-xl font-bold text-gray-900">
                Your Tasks
              </h2>
            </div>

            <TodoList
              page={currentPage}
              search={debouncedSearchQuery || undefined}
              completed={filterCompleted}
              onToggleComplete={handleToggleComplete}
              onEdit={handleEdit}
              onDelete={handleDelete}
              deletingTodoId={deletingTodoId}
              updatingTodoId={updatingTodoId}
              onPageChange={handlePageChange}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default TodosPage;
