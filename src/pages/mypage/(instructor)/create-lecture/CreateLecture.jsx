import React from 'react';

const CreateLecture = () => {
  return (
    <main className="main py-8">
      <div className="main__container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* <!-- Page Header --> */}
        <div className="page-header mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">새 강의 만들기</h1>
          <p className="text-base text-gray-600">강의 정보를 입력하고 학생들과 지식을 공유하세요</p>
        </div>

        {/* <!-- ============================================ -->
        <!-- Create Lecture Form -->
        <!-- Description: 강의 등록 폼 -->
        <!-- ============================================ --> */}
        <form
          className="create-lecture-form space-y-8 rounded-lg bg-white p-8 shadow-md"
          action="/api/lectures"
          method="POST"
          enctype="multipart/form-data"
        >
          {/* <!-- ============================================ -->
          <!-- Basic Information Section -->
          <!-- Description: 기본 정보 섹션 -->
          <!-- ============================================ --> */}
          <section className="form-section">
            <h2 className="mb-6 border-b border-gray-200 pb-3 text-xl font-bold text-gray-900">
              기본 정보
            </h2>

            {/* <!-- Title --> */}
            <div className="form-group mb-6">
              <label for="title" className="mb-2 block text-sm font-medium text-gray-700">
                강의 제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                placeholder="예: React와 TypeScript로 만드는 현대적인 웹 애플리케이션"
                aria-required="true"
              />
            </div>

            {/* <!-- Category --> */}
            <div className="form-group mb-6">
              <label for="category" className="mb-2 block text-sm font-medium text-gray-700">
                카테고리 <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                aria-required="true"
              >
                <option value="">카테고리를 선택하세요</option>
                <option value="development">개발</option>
                <option value="design">디자인</option>
                <option value="business">비즈니스</option>
                <option value="marketing">마케팅</option>
              </select>
            </div>

            {/* <!-- Short Description --> */}
            <div className="form-group mb-6">
              <label
                for="short-description"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                한 줄 소개 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="short-description"
                name="short-description"
                required
                maxlength="100"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                placeholder="강의를 한 줄로 소개해주세요 (최대 100자)"
                aria-required="true"
              />
              <p className="mt-2 text-xs text-gray-500">강의 목록에 표시되는 짧은 설명입니다.</p>
            </div>

            {/* <!-- Description --> */}
            <div className="form-group mb-6">
              <label for="description" className="mb-2 block text-sm font-medium text-gray-700">
                상세 설명 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows="8"
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                placeholder="강의에 대해 자세히 설명해주세요.&#10;&#10;• 어떤 내용을 다루나요?&#10;• 누구를 위한 강의인가요?&#10;• 어떤 것을 배울 수 있나요?"
                aria-required="true"
              ></textarea>
            </div>

            {/* <!-- Thumbnail Upload --> */}
            <div className="form-group">
              <label for="thumbnail" className="mb-2 block text-sm font-medium text-gray-700">
                썸네일 이미지 <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center space-x-4">
                {/* <!-- Preview Area --> */}
                <div className="thumbnail-preview flex h-24 w-40 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-100">
                  <svg
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                {/* <!-- Upload Button --> */}
                <div className="flex-1">
                  <label
                    for="thumbnail"
                    className="inline-block cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    이미지 선택
                  </label>
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    accept="image/*"
                    required
                    className="hidden"
                    aria-required="true"
                  />
                  <p className="mt-2 text-xs text-gray-500">권장 크기: 1280x720px (16:9 비율)</p>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- ============================================ -->
          <!-- Learning Objectives Section -->
          <!-- Description: 학습 목표 섹션 -->
          <!-- ============================================ --> */}
          <section className="form-section">
            <h2 className="mb-6 border-b border-gray-200 pb-3 text-xl font-bold text-gray-900">
              학습 목표
            </h2>

            <div className="form-group">
              <label className="mb-3 block text-sm font-medium text-gray-700">
                수강생이 배울 내용 <span className="text-red-500">*</span>
              </label>
              <p className="mb-4 text-sm text-gray-500">
                이 강의를 통해 수강생이 얻을 수 있는 것을 작성해주세요 (최소 3개)
              </p>

              {/* <!-- Objective Items --> */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    name="objectives[]"
                    required
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                    placeholder="예: React 기초부터 고급 개념까지 완벽 이해"
                  />
                  <button
                    type="button"
                    className="p-2 text-gray-400 transition-colors hover:text-red-500"
                    aria-label="삭제"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    name="objectives[]"
                    required
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                    placeholder="예: TypeScript를 활용한 타입 안정성 확보"
                  />
                  <button
                    type="button"
                    className="p-2 text-gray-400 transition-colors hover:text-red-500"
                    aria-label="삭제"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    name="objectives[]"
                    required
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                    placeholder="예: 실전 프로젝트를 통한 실무 경험"
                  />
                  <button
                    type="button"
                    className="p-2 text-gray-400 transition-colors hover:text-red-500"
                    aria-label="삭제"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* <!-- Add More Button --> */}
              <button
                type="button"
                className="mt-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                + 항목 추가
              </button>
            </div>
          </section>

          {/*        <!-- ============================================ -->
          <!-- Requirements Section -->
          <!-- Description: 수강 요건 섹션 -->
          <!-- ============================================ --> */}
          <section className="form-section">
            <h2 className="mb-6 border-b border-gray-200 pb-3 text-xl font-bold text-gray-900">
              수강 요건
            </h2>

            <div className="form-group">
              <label className="mb-3 block text-sm font-medium text-gray-700">사전 필요 지식</label>
              <p className="mb-4 text-sm text-gray-500">
                수강생이 미리 알아야 하는 내용을 작성해주세요 (선택)
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    name="requirements[]"
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                    placeholder="예: HTML, CSS, JavaScript 기초 지식"
                  />
                  <button
                    type="button"
                    className="p-2 text-gray-400 transition-colors hover:text-red-500"
                    aria-label="삭제"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="mt-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                + 항목 추가
              </button>
            </div>
          </section>

          {/* <!-- ============================================ -->
          <!-- Curriculum Section -->
          <!-- Description: 커리큘럼 섹션 -->
          <!-- ============================================ --> */}
          <section className="form-section">
            <h2 className="mb-6 border-b border-gray-200 pb-3 text-xl font-bold text-gray-900">
              커리큘럼
            </h2>

            <p className="mb-6 text-sm text-gray-500">강의의 각 섹션과 레슨을 추가하세요</p>

            {/* <!-- Section 1 --> */}
            <div className="curriculum-section mb-4 rounded-lg bg-gray-50 p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <input
                    type="text"
                    name="section-title[]"
                    required
                    className="mb-3 w-full rounded-lg border border-gray-300 px-4 py-3 text-base font-medium transition-colors placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                    placeholder="섹션 제목 (예: React 기초)"
                  />
                </div>
                <button
                  type="button"
                  className="ml-3 p-2 text-gray-400 transition-colors hover:text-red-500"
                  aria-label="섹션 삭제"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>

              {/* <!-- Lessons --> */}
              <div className="mb-4 space-y-3">
                <div className="flex items-center space-x-3 rounded-lg bg-white p-3">
                  <svg
                    className="h-5 w-5 shrink-0 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    name="lesson-title[]"
                    required
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                    placeholder="레슨 제목"
                  />
                  <input
                    type="text"
                    name="lesson-duration[]"
                    className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-center text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
                    placeholder="10:30"
                  />
                  <button
                    type="button"
                    className="p-1 text-gray-400 transition-colors hover:text-red-500"
                    aria-label="레슨 삭제"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                + 레슨 추가
              </button>
            </div>

            {/* <!-- Add Section Button --> */}
            <button
              type="button"
              className="w-full rounded-lg border-2 border-dashed border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
            >
              + 섹션 추가
            </button>
          </section>

          {/* <!-- ============================================ -->
          <!-- Additional Settings Section -->
          <!-- Description: 추가 설정 섹션 -->
          <!-- ============================================ --> */}
          <section className="form-section">
            <h2 className="mb-6 border-b border-gray-200 pb-3 text-xl font-bold text-gray-900">
              추가 설정
            </h2>

            {/* <!-- Level --> */}
            <div className="form-group mb-6">
              <label for="level" className="mb-2 block text-sm font-medium text-gray-700">
                난이도 <span className="text-red-500">*</span>
              </label>
              <select
                id="level"
                name="level"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
              >
                <option value="">난이도를 선택하세요</option>
                <option value="beginner">초급</option>
                <option value="intermediate">중급</option>
                <option value="advanced">고급</option>
                <option value="all">모든 수준</option>
              </select>
            </div>

            {/* <!-- Language --> */}
            <div className="form-group">
              <label for="language" className="mb-2 block text-sm font-medium text-gray-700">
                언어 <span className="text-red-500">*</span>
              </label>
              <select
                id="language"
                name="language"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
              >
                <option value="ko" selected>
                  한국어
                </option>
                <option value="en">영어</option>
              </select>
            </div>
          </section>

          {/* <!-- ============================================ -->
          <!-- Form Actions -->
          <!-- Description: 폼 액션 버튼 -->
          <!-- ============================================ --> */}
          <div className="form-actions flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row">
            <button
              type="submit"
              name="action"
              value="publish"
              className="flex-1 rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none"
            >
              강의 등록
            </button>
            <button
              type="submit"
              name="action"
              value="draft"
              className="flex-1 rounded-lg bg-gray-100 px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
            >
              임시저장
            </button>
            <a
              href="/instructor/mypage"
              className="flex-1 rounded-lg border border-gray-300 bg-white px-6 py-3 text-center text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              취소
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateLecture;
