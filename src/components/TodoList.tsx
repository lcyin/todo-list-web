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
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <div className="text-center">
            <span className="text-gray-600 text-xl font-semibold">Loading your todos...</span>
            <p className="text-gray-500 text-sm mt-1">Just a moment ✨</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/30 to-rose-100/30"></div>
        <div className="relative z-10 flex items-start space-x-5">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="h-7 w-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-red-800 mb-3">Oops! Something went wrong</h3>
            <p className="text-red-700 leading-relaxed text-lg mb-4">
              {error instanceof Error
                ? error.message
                : "An unexpected error occurred while loading your todos"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
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
      <div className="text-center py-20">
        <div className="mx-auto h-40 w-40 text-gray-300 mb-8">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">No todos found</h3>
        <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
          {search
            ? `No todos match "${search}". Try a different search term or create a new todo.`
            : completed !== undefined
            ? `No ${completed ? "completed" : "pending"} todos found. ${
                completed ? "Time to get started!" : "Great job! All tasks completed! 🎉"
              }`
            : "Ready to get organized? Create your first todo and start being productive! 🚀"}
        </p>
      </div>
    );
  }

  // Render todos list
  return (
    <div className="space-y-4" role="region" aria-label="Todo items list">
      {/* Enhanced Pagination info and controls */}
      {data.pagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm px-6 py-5 rounded-2xl border border-blue-200/50 shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="font-semibold text-gray-700">
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
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 ${
                  (data.pagination?.page || 1) <= 1
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transform hover:scale-105"
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
                <span className="font-medium">Previous</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-2">
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
                      className={`w-10 h-10 rounded-xl border-2 transition-all duration-200 font-semibold ${
                        pageNum === currentPage
                          ? "bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-600 text-white shadow-lg transform scale-110"
                          : "border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transform hover:scale-105"
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
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl border-2 transition-all duration-200 ${
                  (data.pagination?.page || 1) >= (data.pagination?.totalPages || 1)
                    ? "border-gray-200 text-gray-400 cursor-not-allowed"
                    : "border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 transform hover:scale-105"
                }`}
                aria-label="Go to next page"
              >
                <span className="font-medium">Next</span>
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
      <div className="space-y-5">
        {data.data.map((todo, index) => (
          <div
            key={todo.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <TodoItem
              todo={todo}
              onToggleComplete={onToggleComplete ? () => onToggleComplete(todo) : undefined}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={deletingTodoId === todo.id}
              isUpdating={updatingTodoId === todo.id}
            />
          </div>
        ))}
      </div>

      {/* Footer info */}
      {data.pagination && data.data.length > 0 && (
        <div className="text-center pt-6">
          <p className="text-sm text-gray-500 font-medium">
            {data.pagination.totalPages && data.pagination.totalPages > 1
              ? "Use pagination controls to navigate between pages 📄"
              : "All todos displayed ✨"}
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
