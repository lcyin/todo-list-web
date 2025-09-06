import React from "react";
import { useGetTodos } from "../hooks/useGetTodos";
import { TodoItem } from "./";

interface TodoListProps {
  page?: number;
  limit?: number;
  completed?: boolean;
  search?: string;
  onToggleComplete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  page = 1,
  limit = 10,
  completed,
  search,
  onToggleComplete,
  onEdit,
  onDelete,
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
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600 text-lg">Loading todos...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
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
          <div>
            <h3 className="text-lg font-medium text-red-800">Error loading todos</h3>
            <p className="text-red-600 mt-1">
              {error instanceof Error ? error.message : "An unexpected error occurred"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // No todos found
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No todos found</h3>
        <p className="text-gray-500">
          {search
            ? `No todos match "${search}"`
            : completed !== undefined
            ? `No ${completed ? "completed" : "pending"} todos`
            : "Get started by creating your first todo!"}
        </p>
      </div>
    );
  }

  // Render todos list
  return (
    <div className="space-y-4">
      {/* Pagination info */}
      {data.pagination && (
        <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 px-4 py-3 rounded-lg">
          <span>
            Showing {((data.pagination.page || 1) - 1) * (data.pagination.limit || 10) + 1} to{" "}
            {Math.min(
              (data.pagination.page || 1) * (data.pagination.limit || 10),
              data.pagination.total || 0
            )}{" "}
            of {data.pagination.total || 0} todos
          </span>
          {data.pagination.totalPages && data.pagination.totalPages > 1 && (
            <span>
              Page {data.pagination.page || 1} of {data.pagination.totalPages}
            </span>
          )}
        </div>
      )}

      {/* Todo items */}
      <div className="space-y-3">
        {data.data.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
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
