import React from 'react';
import CategoryBox from '../ui/CategoryBox.jsx';
import SortOption from '../ui/SortOption.jsx';
import { useCategoryFilters } from './useCategoryFilter.js';

function RowCategories() {
  const { filters, setSortOption } = useCategoryFilters({
    category: 'all',
    sort: 'latest',
  });

  return (
    <section className="filter-section py-4">
      <div className="filter-section__container mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CategoryBox sortOptions={filters} setSortOption={setSortOption} />
          <SortOption sortOptions={filters} setSortOption={setSortOption} />
        </div>
      </div>
    </section>
  );
}

export default RowCategories;
