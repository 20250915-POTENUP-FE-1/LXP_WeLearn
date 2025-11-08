import React from 'react';

function LectureContent({ lectureItem }) {
  return (
    <div id="description" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* <!-- Tab Content --> */}
      <div className="mb-12">
        <h2 className="pt-14 pb-6 text-2xl font-bold text-gray-900">강의 설명</h2>
        <div className="prose prose-base space-y-4 text-zinc-500">
          <p>{lectureItem.content}</p>
        </div>
      </div>
    </div>
  );
}

export default LectureContent;
