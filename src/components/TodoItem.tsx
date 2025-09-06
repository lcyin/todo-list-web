import React, { useState } from "react";
import { Todo } from "../types/api";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (
    id: string,
    updates: { title?: string; description?: string; completed?: boolean }
  ) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description || ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async () => {
    setIsLoading(true);
    try {
      await onUpdate(todo.id, { completed: !todo.completed });
    } catch (error) {
      // Error handling in parent
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return;

    setIsLoading(true);
    try {
      await onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || null,
      });
      setIsEditing(false);
    } catch (error) {
      // Error handling in parent
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      setIsLoading(true);
      try {
        await onDelete(todo.id);
      } catch (error) {
        // Error handling in parent
      } finally {
        setIsLoading(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="todo-content">
        <div className="todo-header">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            disabled={isLoading}
            className="completion-checkbox"
          />

          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              maxLength={200}
              disabled={isLoading}
              className="edit-title-input"
              autoFocus
            />
          ) : (
            <h3 className="todo-title">{todo.title}</h3>
          )}
        </div>

        {isEditing ? (
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            maxLength={1000}
            disabled={isLoading}
            className="edit-description-input"
            placeholder="Description (optional)..."
            rows={3}
          />
        ) : (
          todo.description && (
            <p className="todo-description">{todo.description}</p>
          )
        )}

        <div className="todo-meta">
          <span className="todo-dates">
            Created: {formatDate(todo.createdAt)}
            {todo.createdAt !== todo.updatedAt && (
              <> • Updated: {formatDate(todo.updatedAt)}</>
            )}
          </span>
        </div>
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveEdit}
              disabled={!editTitle.trim() || isLoading}
              className="save-button"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={isLoading}
              className="cancel-button"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              disabled={isLoading}
              className="edit-button"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="delete-button"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};
