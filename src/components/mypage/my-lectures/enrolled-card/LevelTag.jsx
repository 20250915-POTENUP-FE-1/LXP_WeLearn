import React from 'react';

const LevelTag = ({ level }) => {
  const map = {
    초급: 'bg-teal-200 text-teal-900 ring-1 ring-teal-700',
    중급: 'bg-purple-200 text-purple-900 ring-1 ring-purple-700',
    고급: 'bg-fuchsia-200 text-fuchsia-900 ring-1 ring-fuchsia-700',
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs ${map[level] || 'text-gray-300 ring-1 ring-gray-600'}`}
    >
      {level || '레벨 미정'}
    </span>
  );
};

export default LevelTag;
