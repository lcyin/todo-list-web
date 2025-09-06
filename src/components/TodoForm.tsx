import React, { useState } from "react";

interface TodoFormProps {
  onSubmit: (title: string, description?: string) => Promise<void>;
  isLoading: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, isLoading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await onSubmit(title.trim(), description.trim() || undefined);
      setTitle("");
      setDescription("");
    } catch (error) {
      // Error handling is done in the parent component
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter todo title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={200}
          required
          disabled={isLoading}
          className="title-input"
        />
      </div>

      <div className="form-group">
        <textarea
          placeholder="Enter description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={1000}
          disabled={isLoading}
          className="description-input"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={!title.trim() || isLoading}
        className="submit-button"
      >
        {isLoading ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
};
