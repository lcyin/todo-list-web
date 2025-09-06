import React from "react";
import type { Todo } from "../api/models/Todo";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200 relative overflow-hidden">
      {/* Completion indicator bar */}
      {todo.completed && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-500"></div>
      )}

      <div className="flex items-start justify-between">
        {/* Main content */}
        <div className="flex items-start space-x-4 flex-1">
          {/* Enhanced Checkbox */}
          <button
            onClick={() => onToggleComplete?.(todo.id)}
            className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
              todo.completed
                ? "bg-green-500 border-green-500 text-white shadow-sm scale-105"
                : "border-gray-300 hover:border-green-400 hover:bg-green-50 focus:border-green-500"
            }`}
          >
            {todo.completed && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>

          {/* Todo content */}
          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-semibold leading-tight mb-1 ${
                todo.completed
                  ? "text-gray-500 line-through"
                  : "text-gray-900 group-hover:text-gray-800"
              }`}
            >
              {todo.title}
            </h3>

            {todo.description && (
              <p
                className={`text-sm leading-relaxed mb-3 ${
                  todo.completed ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {todo.description}
              </p>
            )}

            {/* Enhanced Timestamps */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-400">
              <div className="flex items-center space-x-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6l4 2"
                  />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                <span>Created {formatDate(todo.createdAt)}</span>
              </div>
              {todo.updatedAt !== todo.createdAt && (
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>Updated {formatDate(todo.updatedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Action buttons */}
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {onEdit && (
            <button
              onClick={() => onEdit(todo.id)}
              className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              title="Edit todo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(todo.id)}
              disabled={isDeleting}
              className={`p-2.5 rounded-lg transition-all duration-200 ${
                isDeleting
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-400 hover:text-red-600 hover:bg-red-50"
              }`}
              title={isDeleting ? "Deleting..." : "Delete todo"}
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
