import React from 'react';

function LectureTabs() {
  // 특정 섹션으로 스크롤 이동하는 함수
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="lecture-details bg-white">
      <div className="lecture-details__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 탭 메뉴 */}
        <div className="tab-navigation border-b border-gray-200 pt-3">
          <div className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => scrollToSection('description')}
              className="tab-button border-b-2 border-gray-900 py-4 text-sm font-medium whitespace-nowrap text-gray-900"
            >
              강의 소개
            </button>
            <button
              onClick={() => scrollToSection('curriculum')}
              className="tab-button border-b-2 border-transparent py-4 text-sm font-medium whitespace-nowrap text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-900"
            >
              커리큘럼
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LectureTabs;
