import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-800/70 bg-neutral-900">
      <div className="aspect-[16/9] w-full animate-pulse bg-gray-800/60" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-800/60" />
        <div className="flex gap-2">
          <div className="h-5 w-16 animate-pulse rounded bg-gray-800/60" />
          <div className="h-5 w-20 animate-pulse rounded bg-gray-800/60" />
        </div>
        <div className="h-3 w-full animate-pulse rounded bg-gray-800/60" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-gray-800/60" />
        <div className="h-8 w-28 animate-pulse rounded bg-gray-800/60" />
      </div>
    </div>
  );
};

export default SkeletonCard;
