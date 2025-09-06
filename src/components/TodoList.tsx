import React from "react";
import { useGetTodos } from "../hooks/useGetTodos";
import { TodoItem } from "./";
import type { Todo } from "../api/models/Todo";
import type { UpdateTodoRequest } from "../api/models/UpdateTodoRequest";

interface TodoListProps {
  page?: number;
  limit?: number;
  completed?: boolean;
  search?: string;
  onToggleComplete?: (todo: Todo) => void;
  onEdit?: (id: string, data: UpdateTodoRequest) => void;
  onDelete?: (id: string) => void;
  deletingTodoId?: string | null;
  updatingTodoId?: string | null;
  onPageChange?: (page: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  page = 1,
  limit = 10,
  completed,
  search,
  onToggleComplete,
  onEdit,
  onDelete,
  deletingTodoId,
  updatingTodoId,
  onPageChange,
}) => {
  const { data, isLoading, error } = useGetTodos({
    page,
    limit,
    completed,
    search,
  });

  // Loading spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-xl">
        <div className="flex flex-col items-center space-y-md">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-border border-t-primary"></div>
          <div className="text-center">
            <span className="text-textPrimary text-body font-medium">Loading your todos...</span>
            <p className="text-textSecondary text-small mt-1">Just a moment</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-error/5 border border-error/20 rounded-lg p-lg">
        <div className="flex items-start space-x-md">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-error rounded-lg flex items-center justify-center">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-body font-medium text-textPrimary mb-sm">Something went wrong</h3>
            <p className="text-small text-textSecondary mb-md">
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred while loading your todos"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-error hover:bg-red-700 text-white px-md py-2 rounded-sm text-button transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No todos found
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="text-center py-xl">
        <div className="mx-auto h-24 w-24 text-textSecondary mb-md">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <h3 className="text-h2 text-textPrimary mb-sm">No todos found</h3>
        <p className="text-body text-textSecondary max-w-md mx-auto">
          {search
            ? `No todos match "${search}". Try a different search term or create a new todo.`
            : completed !== undefined
            ? `No ${completed ? "completed" : "pending"} todos found. ${
                completed ? "Time to get started!" : "Great job! All tasks completed!"
              }`
            : "Ready to get organized? Create your first todo and start being productive!"}
        </p>
      </div>
    );
  }

  // Render todos list
  return (
    <div className="space-y-md" role="region" aria-label="Todo items list">
      {/* Pagination info and controls */}
      {data.pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-md text-small text-textSecondary bg-surface border border-border px-md py-md rounded-lg">
          <div className="flex items-center space-x-sm">
            <span className="font-medium text-textPrimary">
              Showing {((data.pagination.page || 1) - 1) * (data.pagination.limit || 10) + 1} to{" "}
              {Math.min(
                (data.pagination.page || 1) * (data.pagination.limit || 10),
                data.pagination.total || 0
              )}{" "}
              of {data.pagination.total || 0} todos
            </span>
          </div>

          {/* Pagination Controls */}
          {data.pagination.totalPages && data.pagination.totalPages > 1 && onPageChange && (
            <nav className="flex items-center space-x-sm" aria-label="Todo list pagination">
              {/* Previous Button */}
              <button
                onClick={() => onPageChange((data.pagination?.page || 1) - 1)}
                disabled={(data.pagination?.page || 1) <= 1}
                className={`flex items-center space-x-sm px-md py-2 rounded-sm border transition-all duration-200 text-button ${
                  (data.pagination?.page || 1) <= 1
                    ? "border-border text-textSecondary cursor-not-allowed"
                    : "border-primary text-primary hover:bg-primary/10"
                }`}
                aria-label="Go to previous page"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>Previous</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-xs">
                {Array.from({ length: Math.min(5, data.pagination.totalPages) }, (_, i) => {
                  const currentPage = data.pagination?.page || 1;
                  const totalPages = data.pagination?.totalPages || 1;

                  // Calculate which page numbers to show
                  let startPage = Math.max(1, currentPage - 2);
                  const endPage = Math.min(totalPages, startPage + 4);

                  if (endPage - startPage < 4) {
                    startPage = Math.max(1, endPage - 4);
                  }

                  const pageNum = startPage + i;
                  if (pageNum > endPage) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => onPageChange(pageNum)}
                      className={`w-8 h-8 rounded-sm border transition-all duration-200 text-button font-medium ${
                        pageNum === currentPage
                          ? "bg-primary border-primary text-white"
                          : "border-border text-textSecondary hover:bg-primary/10 hover:border-primary hover:text-primary"
                      }`}
                      aria-label={`Go to page ${pageNum}`}
                      aria-current={pageNum === currentPage ? "page" : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={() => onPageChange((data.pagination?.page || 1) + 1)}
                disabled={(data.pagination?.page || 1) >= (data.pagination?.totalPages || 1)}
                className={`flex items-center space-x-sm px-md py-2 rounded-sm border transition-all duration-200 text-button ${
                  (data.pagination?.page || 1) >= (data.pagination?.totalPages || 1)
                    ? "border-border text-textSecondary cursor-not-allowed"
                    : "border-primary text-primary hover:bg-primary/10"
                }`}
                aria-label="Go to next page"
              >
                <span>Next</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </nav>
          )}
        </div>
      )}

      {/* Todo items */}
      <div className="space-y-md">
        {data.data.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete ? () => onToggleComplete(todo) : undefined}
            onEdit={onEdit}
            onDelete={onDelete}
            isDeleting={deletingTodoId === todo.id}
            isUpdating={updatingTodoId === todo.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
