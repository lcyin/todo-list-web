import React from "react";
import type { Todo } from "../api/models/Todo";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onEdit, onDelete }) => {
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
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        {/* Main content */}
        <div className="flex items-start space-x-3 flex-1">
          {/* Checkbox */}
          <button
            onClick={() => onToggleComplete?.(todo.id)}
            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              todo.completed
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-300 hover:border-green-400"
            }`}
          >
            {todo.completed && (
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>

          {/* Todo content */}
          <div className="flex-1">
            <h3
              className={`text-lg font-medium ${
                todo.completed ? "text-gray-500 line-through" : "text-gray-900"
              }`}
            >
              {todo.title}
            </h3>

            {todo.description && (
              <p className={`mt-1 text-sm ${todo.completed ? "text-gray-400" : "text-gray-600"}`}>
                {todo.description}
              </p>
            )}

            {/* Timestamps */}
            <div className="mt-2 text-xs text-gray-400 space-y-1">
              <div>Created: {formatDate(todo.createdAt)}</div>
              {todo.updatedAt !== todo.createdAt && (
                <div>Updated: {formatDate(todo.updatedAt)}</div>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2 ml-4">
          {onEdit && (
            <button
              onClick={() => onEdit(todo.id)}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
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
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete todo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
