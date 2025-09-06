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
      className="group bg-white/90 backdrop-blur-sm border border-white/50 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl hover:border-blue-200/50 transition-all duration-300 relative overflow-hidden transform hover:-translate-y-1"
      role="article"
      aria-labelledby={`todo-title-${todo.id}`}
      aria-describedby={todo.description ? `todo-description-${todo.id}` : undefined}
    >
      {/* Completion indicator bar with gradient */}
      {todo.completed && (
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500"
          role="presentation"
        ></div>
      )}

      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative z-10 flex items-start justify-between gap-4 sm:gap-5">
        {/* Main content */}
        <div className="flex items-start space-x-4 sm:space-x-5 flex-1 min-w-0">
          {/* Enhanced Checkbox with more sophisticated styling */}
          <button
            onClick={() => onToggleComplete?.(todo)}
            className={`mt-1 w-6 h-6 sm:w-7 sm:h-7 rounded-xl border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 transform hover:scale-110 ${
              todo.completed
                ? "bg-gradient-to-br from-emerald-500 to-green-600 border-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 focus:border-emerald-500 shadow-md hover:shadow-lg"
            }`}
            aria-label={`Mark "${todo.title}" as ${todo.completed ? "pending" : "completed"}`}
            aria-pressed={todo.completed}
            role="switch"
          >
            {todo.completed && (
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>

          {/* Todo content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              /* Edit Mode */
              <div className="space-y-4">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-lg font-semibold border-2 border-blue-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white/80 backdrop-blur-sm shadow-lg"
                  placeholder="Todo title..."
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full text-sm border-2 border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none bg-white/80 backdrop-blur-sm shadow-lg"
                  placeholder="Add description (optional)..."
                  rows={3}
                />
                <div className="flex items-center space-x-3 pt-2">
                  <button
                    onClick={handleEditSubmit}
                    disabled={!editTitle.trim() || isUpdating}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                  >
                    {isUpdating ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    onClick={handleEditCancel}
                    disabled={isUpdating}
                    className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
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
                  className={`text-base sm:text-lg font-bold leading-tight mb-2 transition-all duration-200 ${
                    todo.completed
                      ? "text-gray-500 line-through"
                      : "text-gray-900 group-hover:text-blue-900"
                  }`}
                >
                  {todo.title}
                </h3>

                {todo.description && (
                  <p
                    id={`todo-description-${todo.id}`}
                    className={`text-sm leading-relaxed mb-3 sm:mb-4 ${
                      todo.completed ? "text-gray-400" : "text-gray-600 group-hover:text-gray-700"
                    }`}
                  >
                    {todo.description}
                  </p>
                )}

                {/* Enhanced Timestamps with better styling */}
                <div className="flex flex-wrap gap-3 sm:gap-4 text-xs">
                  <div className="flex items-center space-x-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                    <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-2.5 h-2.5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M12 6v6l4 2"
                        />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                    <span className="font-medium">Created {formatDate(todo.createdAt)}</span>
                  </div>
                  {todo.updatedAt !== todo.createdAt && (
                    <div className="flex items-center space-x-1.5 text-gray-400 hover:text-gray-600 transition-colors">
                      <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">Updated {formatDate(todo.updatedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Action buttons with better styling */}
        <div className="flex items-center space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 flex-shrink-0">
          {onEdit && !isEditing && (
            <button
              onClick={handleEditClick}
              className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-md hover:shadow-lg border border-transparent hover:border-blue-200"
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
              className={`p-2.5 rounded-xl transition-all duration-200 transform shadow-md hover:shadow-lg border border-transparent ${
                isDeleting
                  ? "text-gray-300 cursor-not-allowed bg-gray-50"
                  : "text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-200 hover:scale-110"
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
