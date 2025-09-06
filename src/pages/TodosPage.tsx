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
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-surface shadow-card border-b border-border">
        <div className="max-w-container mx-auto px-lg py-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-md">
            <div className="flex-1">
              <h1 className="text-h1 text-textPrimary mb-sm">My Todo List</h1>
              <p className="text-body text-textSecondary">
                Organize your tasks and stay productive
              </p>
            </div>
            <button
              onClick={handleAddTodo}
              className="bg-primary hover:bg-blue-700 active:bg-blue-800 text-white px-lg py-3 rounded-sm font-medium transition-all duration-200 flex items-center space-x-sm shadow-button w-full sm:w-auto justify-center sm:justify-start"
              aria-expanded={showAddForm}
              aria-controls="add-todo-form"
              aria-label={showAddForm ? "Cancel adding new todo" : "Add new todo"}
            >
              <svg
                className={`w-5 h-5 transition-transform duration-200 ${
                  showAddForm ? "rotate-45" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span className="text-button">{showAddForm ? "Cancel" : "Add Todo"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-container mx-auto px-lg py-lg">
        {/* Add Todo Form */}
        {showAddForm && (
          <div id="add-todo-form" role="region" aria-labelledby="add-todo-heading">
            <AddTodoForm onSubmit={handleCreateTodo} isLoading={createTodoMutation.isPending} />
          </div>
        )}

        {/* Filters and Search */}
        <section
          className="bg-surface rounded-lg shadow-card border border-border p-lg mb-xl"
          role="search"
          aria-labelledby="search-filters-heading"
        >
          <h2 id="search-filters-heading" className="text-h2 text-textPrimary mb-md">
            Search & Filter
          </h2>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between space-y-md lg:space-y-0 lg:space-x-md">
            {/* Search */}
            <div className="flex-1">
              <label
                htmlFor="search"
                className="block text-small font-medium text-textPrimary mb-sm"
              >
                Search todos
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-textSecondary"
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
                  className="block w-full pl-10 pr-10 py-3 border border-border rounded-sm text-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 bg-surface"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-textSecondary hover:text-textPrimary transition-colors"
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

            {/* Filter */}
            <div className="lg:w-64">
              <label
                htmlFor="filter"
                className="block text-small font-medium text-textPrimary mb-sm"
              >
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
                className="block w-full px-3 py-3 border border-border rounded-sm text-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-surface transition-all duration-200 cursor-pointer"
              >
                <option value="all">All todos</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </section>

        {/* Todo List */}
        <section
          className="bg-surface rounded-lg shadow-card border border-border p-lg"
          aria-labelledby="todo-list-heading"
        >
          <h2 id="todo-list-heading" className="text-h2 text-textPrimary mb-md">
            Your Tasks
          </h2>

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
        </section>
      </main>
    </div>
  );
};

export default TodosPage;
