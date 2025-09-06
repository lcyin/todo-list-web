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
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
      <h2 id="add-todo-heading" className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
        Add New Todo
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            disabled={isLoading}
            placeholder="Enter todo title..."
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              titleError
                ? "border-red-300 bg-red-50"
                : "border-gray-300 bg-white hover:border-gray-400"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-invalid={!!titleError}
            aria-describedby={titleError ? "title-error" : undefined}
          />
          {titleError && (
            <p id="title-error" className="mt-1 text-sm text-red-600" role="alert">
              {titleError}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isLoading}
            placeholder="Enter todo description..."
            rows={3}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-400 transition-colors resize-vertical ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !title.trim()}
            className={`w-full sm:w-auto px-6 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isLoading || !title.trim()
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Adding...</span>
              </div>
            ) : (
              "Add Todo"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
