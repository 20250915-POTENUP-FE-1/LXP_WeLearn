export default function CommentModal() {
  return (
    /* ==================== Modal Overlay ==================== */
    <div className="absolute top-50 right-[-550px] z-50 flex items-center justify-center">
      {/* ==================== Modal Container ==================== */}
      <div className="flex h-[80vh] max-h-[700px] w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        {/* ==================== Modal Header ==================== */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            댓글 <span className="text-gray-500">57</span>
          </h2>
          <div className="flex items-center gap-2">
            {/* 정렬 버튼 */}
            <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-600"
              >
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            {/* 닫기 버튼 */}
            <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-600"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* ==================== Sort Dropdown (정렬 드롭다운) - hidden 제거하여 표시 ==================== */}
        {/* 
        <div className="absolute right-16 top-14 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[120px] z-50">
          <button className="w-full px-4 py-2 text-left text-sm text-black font-medium hover:bg-gray-100">최신순</button>
          <button className="w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-100">오래된순</button>
        </div>
        */}

        {/* ==================== Comment List (댓글 목록 영역) ==================== */}
        <div className="flex-1 overflow-y-auto px-4">
          {/* ==================== Comment Block 1 ==================== */}
          <div className="border-b border-gray-200 py-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-1 items-start gap-3">
                {/* 프로필 이미지 */}
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                {/* 댓글 내용 */}
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">김코드</span>
                    <span className="text-xs text-gray-400">12시간 전</span>
                  </div>
                  <p className="mb-2 text-sm leading-relaxed text-gray-700">
                    코딩 초고수인것도 놀라운데 누구나 볼 수 있게 오픈소스로 푼게 더 놀라움
                  </p>
                  {/* 답글 토글 & 답글달기 */}
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-black">
                      답글 2개
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    <button className="text-xs text-gray-500 transition-colors hover:text-black">
                      답글달기
                    </button>
                  </div>
                </div>
              </div>
              {/* 더보기 버튼 */}
              <button className="rounded-full p-1 transition-colors hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </div>

            {/* ==================== Reply Input Section (답글 입력 영역) - hidden 제거하여 표시 ==================== */}

            <div className="mt-2 rounded-lg bg-gray-50 py-3 pl-12">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="답글을 입력하세요..."
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
                />
                <button className="rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200">
                  취소
                </button>
                <button className="rounded-md bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800">
                  등록
                </button>
              </div>
            </div>

            {/* ==================== Reply Block List (답글 목록) ==================== */}
            <div className="mt-3">
              {/* Reply 1 */}
              <div className="border-b border-gray-100 py-3 pl-12">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">replyBlock</span>
                      <span className="text-xs text-gray-400">8시간 전</span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700">
                      코딩을 하다보면 쓸데없는데 관심이 더 생깁니다.
                    </p>
                  </div>
                  <button className="rounded-full p-1 transition-colors hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </div>
              {/* Reply 2 */}
              <div className="py-3 pl-12">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">replyBlock</span>
                      <span className="text-xs text-gray-400">5시간 전</span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700">
                      css를 소스를 보면 알 수 있지만, 코딩, 수학, 예술 모두 만렙을 찍은 인간의 종합
                      예술임.
                    </p>
                  </div>
                  <button className="rounded-full p-1 transition-colors hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-400"
                    >
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== Comment Block 2 (본인 댓글 - 삭제 아이콘 표시) ==================== */}
          <div className="border-b border-gray-200 py-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-1 items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">commentBlock</span>
                    <span className="text-xs text-gray-400">1일 전</span>
                  </div>
                  <p className="mb-2 text-sm leading-relaxed text-gray-700">
                    이렇게 보니 이해가 쏙 되시죠? 이해 안되는 다른 개발자 많이 있다면 댓글로
                    알려주세요!
                  </p>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-xs text-gray-500 transition-colors hover:text-black">
                      답글 4개
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    <button className="text-xs text-gray-500 transition-colors hover:text-black">
                      답글달기
                    </button>
                  </div>
                </div>
              </div>
              {/* 삭제 아이콘 (본인 댓글) */}
              <button className="rounded-full p-1 transition-colors hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* ==================== Empty State (댓글 없을 때) ==================== */}
          {/* 
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <p>아직 댓글이 없습니다.</p>
            <p className="text-sm mt-1">첫 번째 댓글을 남겨보세요!</p>
          </div>
          */}
        </div>

        {/* ==================== Comment Input Section Fixed (하단 고정 입력창) ==================== */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            {/* 프로필 아이콘 */}
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            {/* 입력 필드 */}
            <input
              type="text"
              placeholder="댓글을 입력하세요..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-3 text-sm focus:border-black focus:ring-1 focus:ring-black focus:outline-none"
            />
          </div>
          {/* 버튼 영역 */}
          <div className="mt-3 flex justify-end gap-2">
            <button className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50">
              취소
            </button>
            <button className="rounded-md bg-black px-6 py-2 text-sm text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300">
              등록
            </button>
          </div>
        </div>
      </div>

      {/* ==================== Dropdown Menu (더보기 드롭다운) - hidden 제거하여 표시 ==================== */}
      {/* 
      <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[100px] z-50">
        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          수정
        </button>
        <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          삭제
        </button>
      </div>
      */}

      {/* ==================== Confirm Modal (삭제 확인 모달) - hidden 제거하여 표시 ==================== */}
      {/* 
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg p-6 w-[280px] shadow-xl">
          <p className="text-center text-gray-800 mb-6">댓글을 완전히 삭제할까요?</p>
          <div className="flex gap-3 justify-center">
            <button className="px-6 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">취소</button>
            <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">삭제</button>
          </div>
        </div>
      </div>
      */}
    </div>
  )
}
