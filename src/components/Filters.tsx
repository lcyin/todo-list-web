import React from "react";
import { TodoFilters } from "../types/api";

interface FiltersProps {
  filters: TodoFilters;
  onFiltersChange: (filters: TodoFilters) => void;
  isLoading: boolean;
}

export const Filters: React.FC<FiltersProps> = ({
  filters,
  onFiltersChange,
  isLoading,
}) => {
  const handleCompletedFilterChange = (value: string) => {
    const completed = value === "all" ? undefined : value === "completed";
    onFiltersChange({ ...filters, completed, page: 1 });
  };

  const handleSearchChange = (search: string) => {
    onFiltersChange({ ...filters, search: search || undefined, page: 1 });
  };

  const handleLimitChange = (limit: number) => {
    onFiltersChange({ ...filters, limit, page: 1 });
  };

  return (
    <div className="filters">
      <div className="filter-group">
        <label htmlFor="search">Search:</label>
        <input
          id="search"
          type="text"
          placeholder="Search todos..."
          value={filters.search || ""}
          onChange={(e) => handleSearchChange(e.target.value)}
          disabled={isLoading}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={
            filters.completed === undefined
              ? "all"
              : filters.completed
              ? "completed"
              : "pending"
          }
          onChange={(e) => handleCompletedFilterChange(e.target.value)}
          disabled={isLoading}
          className="status-select"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="limit">Per page:</label>
        <select
          id="limit"
          value={filters.limit || 10}
          onChange={(e) => handleLimitChange(parseInt(e.target.value))}
          disabled={isLoading}
          className="limit-select"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
};
