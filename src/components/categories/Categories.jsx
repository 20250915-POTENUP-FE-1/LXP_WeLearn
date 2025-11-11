import React, { useState, useEffect } from 'react';
import CategoryBox from '../ui/CategoryBox';
import SortOption from '../ui/SortOption';
import { useSearchParams } from 'react-router-dom';

function categories() {
  const [sortOptions, setSortOption] = useState({
    category: 'all',
    sort: 'latest',
  });

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (sortOptions.category) newParams.set('category', sortOptions.category);
    else newParams.delete('category');

    if (sortOptions.sort) newParams.set('sort', sortOptions.sort);
    else newParams.delete('sort');

    setSearchParams(newParams, { replace: true });
  }, [sortOptions]);

  return (
    <section className="filter-section py-4">
      <div className="filter-section__container mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CategoryBox sortOptions={sortOptions} setSortOption={setSortOption} />
          <SortOption sortOptions={sortOptions} setSortOption={setSortOption} />
        </div>
      </div>
    </section>
  );
}

export default categories;
