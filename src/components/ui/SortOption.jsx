import React from 'react';

function SortOption({ sortOption, setSortOption }) {
  // props로 받아온 useState({sortOption, setSortOption}) 조절
  const handleChange = (e) => {
    setSortOption((prev) => ({ ...prev, sort: e.target.value }));
  };

  return (
    <select
      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-gray-900 focus:outline-none"
      value={sortOption}
      onChange={handleChange}
    >
      <option value="latest">최신순</option>
      <option value="students">수강생순</option>
      <option value="rating">별점순</option>
    </select>
  );
}

export default SortOption;
