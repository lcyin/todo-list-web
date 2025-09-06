import React from "react";
import { Pagination } from "../types/api";

interface PaginationProps {
  pagination: Pagination;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

export const PaginationComponent: React.FC<PaginationProps> = ({
  pagination,
  onPageChange,
  isLoading,
}) => {
  const { page, totalPages, total } = pagination;

  const getPageNumbers = () => {
    const pages = [];
    const maxPages = 5; // Show max 5 page numbers

    let start = Math.max(1, page - Math.floor(maxPages / 2));
    let end = Math.min(totalPages, start + maxPages - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < maxPages) {
      start = Math.max(1, end - maxPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing page {page} of {totalPages} ({total} total items)
      </div>

      <div className="pagination-controls">
        <button
          onClick={() => onPageChange(1)}
          disabled={page === 1 || isLoading}
          className="page-button first"
        >
          First
        </button>

        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1 || isLoading}
          className="page-button prev"
        >
          Previous
        </button>

        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            disabled={isLoading}
            className={`page-button ${pageNum === page ? "active" : ""}`}
          >
            {pageNum}
          </button>
        ))}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages || isLoading}
          className="page-button next"
        >
          Next
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={page === totalPages || isLoading}
          className="page-button last"
        >
          Last
        </button>
      </div>
    </div>
  );
};
