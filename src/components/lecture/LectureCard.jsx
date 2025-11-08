import React from 'react';
import CATEGORIES from '../../constants/categories';

function LectureCard({ lecture }) {
  const category = CATEGORIES.find((e) => e.id === lecture.category);

  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl">
      <div className="relative aspect-video bg-gray-200">
        <img
          src={lecture.thumbnailUrl}
          alt="React 완전 정복"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute top-3 left-3 rounded-full bg-gray-900 px-3 py-1 text-xs font-medium text-white">
          {category.name}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 max-h-16 min-h-16 text-lg font-bold text-gray-900">
          {lecture.title}
        </h3>

        <p className="text-sm text-gray-600">{lecture.userName}</p>

        <div className="flex items-center justify-between border-t border-gray-100 pt-2">
          <div className="flex items-center space-x-1">
            <svg className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="text-sm font-medium text-gray-900">4.8</span>
            <span className="text-sm text-gray-500">(120)</span>
          </div>

          <span className="text-sm text-gray-500">{`(${lecture.studentCount})명`}</span>
        </div>
      </div>
    </div>
  );
}

export default LectureCard;
