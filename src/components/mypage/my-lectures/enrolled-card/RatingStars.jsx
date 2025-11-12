import React from 'react';

const RatingStars = ({ rating = 0 }) => {
  const pct = (Math.max(0, Math.min(5, rating)) / 5) * 100;
  return (
    <div className="relative inline-block font-semibold">
      <div className="text-sm tracking-tight text-gray-600 select-none">★★★★★</div>
      <div
        className="absolute top-0 left-0 overflow-hidden text-sm tracking-tight whitespace-nowrap text-yellow-400"
        style={{ width: `${pct}%` }}
        aria-hidden="true"
      >
        ★★★★★
      </div>
      <span className="sr-only">평점 {rating} / 5</span>
    </div>
  );
};

export default RatingStars;
