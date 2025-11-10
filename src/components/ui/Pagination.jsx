import React from 'react';
import { PAGE_RANGE } from '../../constants/paginationConstants';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const startPage = Math.floor((currentPage - 1) / PAGE_RANGE) * PAGE_RANGE + 1;
  const endPage = Math.min(startPage + PAGE_RANGE - 1, totalPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 pb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || pages.length === 0}
        className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
          currentPage === 1 || pages.length === 0
            ? 'cursor-not-allowed border-gray-200 bg-white text-gray-400'
            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
        }`}
      >
        이전
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
            page === currentPage
              ? 'border-gray-900 bg-gray-900 text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || pages.length === 0}
        className={`rounded-md border px-3 py-1.5 text-sm font-medium ${
          currentPage === totalPages || pages.length === 0
            ? 'cursor-not-allowed border-gray-200 bg-white text-gray-400'
            : 'border-gray-300 text-gray-700 hover:bg-gray-100'
        }`}
      >
        다음
      </button>
    </div>
  );
}

export default Pagination;
