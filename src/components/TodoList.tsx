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
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200"></div>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <span className="text-gray-600 text-lg font-medium">Loading your todos...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="h-6 w-6 text-red-600"
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
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error loading todos</h3>
            <p className="text-red-700 leading-relaxed">
              {error instanceof Error ? error.message : "An unexpected error occurred"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
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
      <div className="text-center py-16">
        <div className="mx-auto h-32 w-32 text-gray-300 mb-6">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">No todos found</h3>
        <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
          {search
            ? `No todos match "${search}". Try a different search term.`
            : completed !== undefined
            ? `No ${completed ? "completed" : "pending"} todos found.`
            : "Get started by creating your first todo item!"}
        </p>
      </div>
    );
  }

  // Render todos list
  return (
    <div className="space-y-4" role="region" aria-label="Todo items list">
      {/* Enhanced Pagination info and controls */}
      {data.pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 rounded-xl border border-gray-200">
          <div className="flex items-center space-x-2">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="font-medium">
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
            <nav className="flex items-center space-x-2" aria-label="Todo list pagination">
              {/* Previous Button */}
              <button
                onClick={() => onPageChange((data.pagination?.page || 1) - 1)}
                disabled={(data.pagination?.page || 1) <= 1}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-colors ${
                  (data.pagination?.page || 1) <= 1
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
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
              <div className="flex items-center space-x-1">
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
                      className={`w-8 h-8 rounded-lg border transition-colors ${
                        pageNum === currentPage
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
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
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-colors ${
                  (data.pagination?.page || 1) >= (data.pagination?.totalPages || 1)
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
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

      {/* Todo items with enhanced spacing */}
      <div className="space-y-4">
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

      {/* Footer info */}
      {data.pagination && data.data.length > 0 && (
        <div className="text-center pt-4">
          <p className="text-sm text-gray-500">
            {data.pagination.totalPages && data.pagination.totalPages > 1
              ? "Use pagination controls to navigate between pages"
              : "All todos displayed"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
