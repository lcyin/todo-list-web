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
      className="bg-surface border border-border rounded-lg p-md shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1"
      role="article"
      aria-labelledby={`todo-title-${todo.id}`}
      aria-describedby={todo.description ? `todo-description-${todo.id}` : undefined}
    >
      {/* Completion indicator bar */}
      {todo.completed && (
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-success rounded-t-lg"
          role="presentation"
        ></div>
      )}

      <div className="flex items-start justify-between gap-md">
        {/* Main content */}
        <div className="flex items-start space-x-md flex-1 min-w-0">
          {/* Checkbox */}
          <button
            onClick={() => onToggleComplete?.(todo)}
            className={`mt-1 w-6 h-6 rounded-sm border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0 transform hover:scale-105 ${
              todo.completed
                ? "bg-success border-success text-white shadow-button"
                : "border-border hover:border-success hover:bg-success/10 focus:border-success"
            }`}
            aria-label={`Mark "${todo.title}" as ${todo.completed ? "pending" : "completed"}`}
            aria-pressed={todo.completed}
            role="switch"
          >
            {todo.completed && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="flex-1 min-w-0">
            {isEditing ? (
              /* Edit Mode */
              <div className="space-y-md">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full text-body font-medium border border-border rounded-sm px-3 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-surface"
                  placeholder="Todo title..."
                  autoFocus
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full text-small border border-border rounded-sm px-3 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none bg-surface"
                  placeholder="Add description (optional)..."
                  rows={3}
                />
                <div className="flex items-center space-x-sm pt-sm">
                  <button
                    onClick={handleEditSubmit}
                    disabled={!editTitle.trim() || isUpdating}
                    className="bg-primary hover:bg-blue-700 disabled:bg-gray-300 text-white px-lg py-2 rounded-sm text-button transition-all duration-200 shadow-button"
                  >
                    {isUpdating ? (
                      <div className="flex items-center space-x-sm">
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
                    className="bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-textPrimary px-lg py-2 rounded-sm text-button transition-all duration-200"
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
                  className={`text-body font-medium leading-tight mb-sm transition-all duration-200 ${
                    todo.completed
                      ? "text-textSecondary line-through opacity-60"
                      : "text-textPrimary"
                  }`}
                >
                  {todo.title}
                </h3>

                {todo.description && (
                  <p
                    id={`todo-description-${todo.id}`}
                    className={`text-small leading-relaxed mb-md ${
                      todo.completed ? "text-textSecondary opacity-60" : "text-textSecondary"
                    }`}
                  >
                    {todo.description}
                  </p>
                )}

                {/* Timestamps */}
                <div className="flex flex-wrap gap-md text-xs text-textSecondary">
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

        {/* Action buttons */}
        <div className="flex items-center space-x-sm opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 flex-shrink-0">
          {onEdit && !isEditing && (
            <button
              onClick={handleEditClick}
              className="p-2 text-textSecondary hover:text-primary hover:bg-primary/10 rounded-sm transition-all duration-200 border border-transparent hover:border-primary/20"
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
              className={`p-2 rounded-sm transition-all duration-200 border border-transparent ${
                isDeleting
                  ? "text-textSecondary cursor-not-allowed bg-gray-50"
                  : "text-textSecondary hover:text-error hover:bg-error/10 hover:border-error/20"
              }`}
              aria-label={isDeleting ? `Deleting "${todo.title}"...` : `Delete "${todo.title}"`}
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-textSecondary border-t-transparent rounded-full animate-spin"></div>
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
