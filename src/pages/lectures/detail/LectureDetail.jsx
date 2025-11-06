import React, { useState } from 'react';

const LectureDetail = () => {
  // const [lectureItem, setLectureItem] = useState({});

  return (
    <main className="main pb-12">
      <section className="lecture-hero border-b border-gray-200 bg-white py-8">
        <div className="lecture-hero__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* <!-- Left: Lecture Info (3/5 width) --> */}
            <div className="lecture-info lg:col-span-2">
              {/* <!-- Category Badge --> */}
              <span className="mb-4 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-900">
                프론트엔드
              </span>

              {/* <!-- Title --> */}
              <h1 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                React와 TypeScript로 만드는 현대적인 웹 애플리케이션
              </h1>

              {/* <!-- Description --> */}
              <p className="mb-6 text-lg text-gray-600">
                기초부터 실전 프로젝트까지, React와 TypeScript를 활용한 웹 개발의 모든 것을
                배워보세요.
              </p>

              {/* <!-- Meta Info --> */}
              <div className="mb-6 flex flex-wrap items-center gap-4 border-b border-gray-200 pb-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <svg className="h-5 w-5 fill-current text-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="font-medium text-gray-900">4.8</span>
                  <span>(120개 평가)</span>
                </div>

                <div className="flex items-center space-x-1">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span>350명 수강</span>
                </div>

                <div className="flex items-center space-x-1">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>총 12시간</span>
                </div>

                <div className="flex items-center space-x-1">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                  <span>24개 강의</span>
                </div>
              </div>

              {/* <!-- Instructor Info --> */}
              <div className="mb-6 flex items-center space-x-2">
                <p className="text-sm text-gray-500">강사</p>
                <p className="text-base font-medium text-gray-900">윤강사</p>
              </div>

              {/* <!-- CTA Button (Left aligned) --> */}
              <div>
                <button className="w-full rounded-lg bg-gray-900 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none">
                  수강신청
                </button>
              </div>
            </div>

            {/* <!-- Right: Large Thumbnail (2/5 width) --> */}
            <div className="lecture-thumbnail lg:col-span-3">
              <div className="top-24">
                <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-200 shadow-lg">
                  <img
                    src="https://via.placeholder.com/800x450"
                    alt="강의 썸네일"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Description: 강의 상세 정보 탭 --> */}

      <section className="lecture-details bg-white">
        <div className="lecture-details__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* <!-- Tab Navigation --> */}
          <div className="tab-navigation border-b border-gray-200">
            <div className="flex space-x-8 overflow-x-auto">
              <button className="tab-button border-b-2 border-gray-900 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                강의 소개
              </button>
              <button className="tab-button border-b-2 border-transparent py-4 text-sm font-medium whitespace-nowrap text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-900">
                커리큘럼
              </button>
              <button className="tab-button border-b-2 border-transparent py-4 text-sm font-medium whitespace-nowrap text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-900">
                강사 정보
              </button>
            </div>
          </div>

          {/* <!-- Tab Content --> */}
          <div className="tab-content max-w-4xl py-8">
            {/* <!-- ============================================ --> */}
            {/* <!-- Overview Tab Content --> */}
            {/* <!-- Description: 강의 소개 --> */}
            {/* <!-- ============================================ --> */}
            <div className="overview-content">
              {/* <!-- What You'll Learn --> */}
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">이런 것을 배워요</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-base text-gray-700">
                      React 기초부터 고급 개념까지 완벽 이해
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-base text-gray-700">
                      TypeScript를 활용한 타입 안정성 확보
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-base text-gray-700">컴포넌트 설계 및 상태 관리 패턴</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-base text-gray-700">실전 프로젝트를 통한 실무 경험</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-base text-gray-700">React Hooks와 Context API 활용</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <svg
                      className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-base text-gray-700">
                      성능 최적화 기법 및 베스트 프랙티스
                    </span>
                  </div>
                </div>
              </div>

              {/* <!-- Description --> */}
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">강의 설명</h2>
                <div className="prose prose-base space-y-4 text-gray-700">
                  <p>
                    이 강의는 React와 TypeScript를 활용하여 현대적인 웹 애플리케이션을 개발하는
                    방법을 다룹니다. 기초 개념부터 시작하여 실전 프로젝트까지 단계별로 학습할 수
                    있도록 구성되어 있습니다.
                  </p>
                  <p>
                    React의 핵심 개념인 컴포넌트, Props, State, Lifecycle을 깊이 있게 학습하고,
                    TypeScript를 통해 타입 안정성을 확보하는 방법을 배웁니다. 또한 React Hooks,
                    Context API, 상태 관리 라이브러리 등 실무에서 필수적인 기술들을 다룹니다.
                  </p>
                  <p>
                    강의 후반부에는 실제 서비스와 유사한 프로젝트를 진행하며, 배운 내용을 실전에
                    적용하는 경험을 쌓을 수 있습니다. 성능 최적화, 테스팅, 배포까지 전체 개발
                    프로세스를 경험해보세요.
                  </p>
                </div>
              </div>

              {/* <!-- Requirements --> */}
              <div className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">수강 전 필요한 지식</h2>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-900"></span>
                    <span className="text-base text-gray-700">HTML, CSS, JavaScript 기초 지식</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-900"></span>
                    <span className="text-base text-gray-700">ES6+ 문법에 대한 이해</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-900"></span>
                    <span className="text-base text-gray-700">Node.js와 npm 사용 경험 (선택)</span>
                  </li>
                </ul>
              </div>

              {/* <!-- Target Audience --> */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">이런 분들께 추천해요</h2>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-900"></span>
                    <span className="text-base text-gray-700">
                      React를 처음 배우는 프론트엔드 개발자
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-900"></span>
                    <span className="text-base text-gray-700">
                      TypeScript를 React에 적용하고 싶은 개발자
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-900"></span>
                    <span className="text-base text-gray-700">
                      실전 프로젝트 경험을 쌓고 싶은 분
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-900"></span>
                    <span className="text-base text-gray-700">
                      최신 프론트엔드 기술 스택을 학습하고 싶은 분
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LectureDetail;
