import React from 'react';
import CATEGORIES from '../../constants/categories';

function CategoryBox({ sortOptions, setSortOption }) {
  // props로 받아온 useState({sortOption, setSortOption}) 조절
  const handleCategoryClick = (e) => {
    setSortOption((prev) => ({ ...prev, category: e.target.value }));
  };

  return (
    <>
      <div className="filter-buttons flex flex-wrap items-center gap-2">
        <button
          className={`rounded-full px-4 py-2 text-sm font-medium ${sortOptions.category === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'} `}
          value="all"
          onClick={handleCategoryClick}
        >
          전체
        </button>

        {CATEGORIES.map((category) => {
          return (
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${sortOptions.category === category.key ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-200'}`}
              key={category.name}
              onClick={handleCategoryClick}
              value={category.key}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default CategoryBox;
