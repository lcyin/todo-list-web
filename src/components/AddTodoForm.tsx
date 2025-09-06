import React, { useState } from "react";
import type { CreateTodoRequest } from "../api/models/CreateTodoRequest";

interface AddTodoFormProps {
  onSubmit: (todo: CreateTodoRequest) => void;
  isLoading?: boolean;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onSubmit, isLoading = false }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }

    if (title.trim().length < 3) {
      setTitleError("Title must be at least 3 characters long");
      return;
    }

    setTitleError("");

    // Submit the form
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
    });

    // Reset form
    setTitle("");
    setDescription("");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (titleError) {
      setTitleError("");
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-card border border-border p-lg mb-xl">
      <div>
        <h2 id="add-todo-heading" className="text-h2 text-textPrimary mb-md">
          Create New Todo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-md">
          <div className="space-y-sm">
            <label htmlFor="title" className="block text-small font-medium text-textPrimary">
              Title *
            </label>
            <div className="relative">
              <input
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                disabled={isLoading}
                placeholder="What needs to be done?"
                className={`w-full px-3 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-body ${
                  titleError
                    ? "border-error bg-red-50/50 focus:border-error focus:ring-error/20"
                    : "border-border bg-surface hover:border-gray-300"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                aria-invalid={!!titleError}
                aria-describedby={titleError ? "title-error" : undefined}
              />
              {title && !titleError && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-success"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            {titleError && (
              <div className="flex items-center space-x-sm mt-sm">
                <svg
                  className="w-4 h-4 text-error"
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
                <p id="title-error" className="text-small text-error font-medium" role="alert">
                  {titleError}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-sm">
            <label htmlFor="description" className="block text-small font-medium text-textPrimary">
              Description <span className="text-textSecondary font-normal">(optional)</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
              placeholder="Add more details about this todo..."
              rows={4}
              className={`w-full px-3 py-3 border border-border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-surface hover:border-gray-300 transition-all duration-200 resize-none ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </div>

          <div className="flex justify-end pt-md">
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className={`px-lg py-3 rounded-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 text-button ${
                isLoading || !title.trim()
                  ? "bg-gray-200 text-textSecondary cursor-not-allowed"
                  : "bg-primary text-white hover:bg-blue-700 shadow-button focus:ring-primary/50"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center space-x-sm">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Create Todo</span>
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
