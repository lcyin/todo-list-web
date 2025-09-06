import React, { useState } from "react";
import type { Todo } from "../api/models/Todo";
import type { UpdateTodoRequest } from "../api/models/UpdateTodoRequest";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete?: (todo: Todo) => void;
  onEdit?: (id: string, data: UpdateTodoRequest) => void;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
  isUpdating?: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
  isDeleting = false,
  isUpdating = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || "");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleEditSubmit = () => {
    if (!editTitle.trim()) return;

    onEdit?.(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || null,
    });
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  return (
    <article
      className="group bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200 relative overflow-hidden"
      role="article"
      aria-labelledby={`todo-title-${todo.id}`}
      aria-describedby={todo.description ? `todo-description-${todo.id}` : undefined}
    >
      {/* Completion indicator bar */}
      {todo.completed && (
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-500"
          role="presentation"
        ></div>
      )}

      <div className="flex items-start justify-between gap-3 sm:gap-4">
        {/* Main content */}
        <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
          {/* Enhanced Checkbox */}
          <button
            onClick={() => onToggleComplete?.(todo)}
            className={`mt-1 w-5 h-5 sm:w-6 sm:h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
              todo.completed
                ? "bg-green-500 border-green-500 text-white shadow-sm scale-105"
                : "border-gray-300 hover:border-green-400 hover:bg-green-50 focus:border-green-500"
            }`}
            aria-label={`Mark "${todo.title}" as ${todo.completed ? "pending" : "completed"}`}
            aria-pressed={todo.completed}
            role="switch"
          >
            {todo.completed && (
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
            {isEditing ? (
              /* Edit Mode */
              <div className="space-y-3">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-lg font-semibold border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Todo title..."
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Add description (optional)..."
                  rows={2}
                />
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleEditSubmit}
                    disabled={!editTitle.trim() || isUpdating}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    {isUpdating ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={handleEditCancel}
                    disabled={isUpdating}
                    className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              /* Display Mode */
              <div>
                <h3
                  id={`todo-title-${todo.id}`}
                  className={`text-base sm:text-lg font-semibold leading-tight mb-1 ${
                    todo.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-900 group-hover:text-gray-800"
                  }`}
                >
                  {todo.title}
                </h3>

                {todo.description && (
                  <p
                    id={`todo-description-${todo.id}`}
                    className={`text-sm leading-relaxed mb-2 sm:mb-3 ${
                      todo.completed ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {todo.description}
                  </p>
                )}

                {/* Enhanced Timestamps */}
                <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-gray-400">
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
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
            )}
          </div>
        </div>

        {/* Enhanced Action buttons */}
        <div className="flex items-center space-x-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
          {onEdit && !isEditing && (
            <button
              onClick={handleEditClick}
              className="p-2 sm:p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              aria-label={`Edit "${todo.title}"`}
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

          {onDelete && !isEditing && (
            <button
              onClick={() => onDelete(todo.id)}
              disabled={isDeleting}
              className={`p-2 sm:p-2.5 rounded-lg transition-all duration-200 ${
                isDeleting
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-400 hover:text-red-600 hover:bg-red-50"
              }`}
              aria-label={isDeleting ? `Deleting "${todo.title}"...` : `Delete "${todo.title}"`}
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
    </article>
  );
};

export default TodoItem;
