import React from "react";
import { useTodos } from "../hooks/useTodos";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { Filters } from "./Filters";
import { PaginationComponent } from "./Pagination";

export const TodoList: React.FC = () => {
  const {
    todos,
    pagination,
    isLoading,
    error,
    filters,
    setFilters,
    createTodo,
    updateTodo,
    deleteTodo,
  } = useTodos();

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      <header className="app-header">
        <h1>Todo List</h1>
        <p>Manage your tasks efficiently</p>
      </header>

      <section className="add-todo-section">
        <h2>Add New Todo</h2>
        <TodoForm onSubmit={createTodo} isLoading={isLoading} />
      </section>

      <section className="filters-section">
        <h2>Filter Todos</h2>
        <Filters
          filters={filters}
          onFiltersChange={setFilters}
          isLoading={isLoading}
        />
      </section>

      <section className="todos-section">
        <div className="todos-header">
          <h2>Your Todos</h2>
          {pagination && (
            <span className="todos-count">{pagination.total} total todos</span>
          )}
        </div>

        {isLoading && todos.length === 0 ? (
          <div className="loading-container">
            <p>Loading todos...</p>
          </div>
        ) : todos.length === 0 ? (
          <div className="empty-state">
            <p>No todos found. Create your first todo above!</p>
          </div>
        ) : (
          <>
            <div className="todos-grid">
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </div>

            {pagination && (
              <PaginationComponent
                pagination={pagination}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
};
