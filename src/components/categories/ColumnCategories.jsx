import React from 'react';
import { useCategoryFilters } from './useCategoryFilter.js';
import CATEGORIES from '../../constants/categories.js';

function ColumnCategories() {
  const { filters, setSortOption } = useCategoryFilters({
    category: 'all',
    sort: 'latest',
  });
  const handleCategoryClick = (e) => {
    setSortOption((prev) => ({ ...prev, category: e.target.value }));
  };

  return (
    <section className="space-y-1 py-4">
      <div className="filter-buttons flex flex-wrap items-center gap-2">
        <button
          data-active={filters.category === 'all'}
          className="block w-full rounded-lg bg-white px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 data-[active=true]:bg-gray-900 data-[active=true]:text-white data-[active=true]:hover:bg-gray-800"
          value="all"
          onClick={handleCategoryClick}
        >
          전체
        </button>

        {CATEGORIES.map((category) => {
          const active = filters.category === category.key;
          return (
            <button
              key={category.key}
              type="button"
              data-active={active}
              aria-pressed={active}
              onClick={() => setSortOption((prev) => ({ ...prev, category: category.key }))}
              className="block w-full rounded-lg bg-white px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 data-[active=true]:bg-gray-900 data-[active=true]:text-white data-[active=true]:hover:bg-gray-800"
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default ColumnCategories;
