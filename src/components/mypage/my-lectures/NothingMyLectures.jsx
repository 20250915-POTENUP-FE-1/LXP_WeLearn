import React from 'react';

const NothingMyLectures = () => {
  return (
    <div className="empty-state flex flex-col items-center justify-center rounded-lg bg-white px-4 py-16">
      <div className="mb-4 text-6xl">📚</div>
      <p className="mb-2 text-lg font-medium text-gray-900">아직 수강 중인 강의가 없습니다</p>
      <p className="mb-6 text-sm text-gray-500">관심 있는 강의를 찾아보세요</p>
      <a
        href="/lectures"
        className="rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800"
      >
        강의 찾아보기
      </a>
    </div>
  );
};

export default NothingMyLectures;
