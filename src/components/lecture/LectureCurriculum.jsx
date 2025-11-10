import React from 'react';

/**
 * LectureCurriculum 컴포넌트
 * ----------------------------------------
 * Firestore로부터 전달받은 `curriculum` 데이터를 기반으로
 * 강의의 커리큘럼(챕터 및 각 강의)을 화면에 렌더링하는 역할
 *
 * @param {Array} curriculum - 강의 커리큘럼 데이터 배열
 * 기본값은 빈 배열([]). 데이터가 없더라도 map 오류를 방지
 */

function LectureCurriculum({ curriculum = [] }) {
  const handlePreviewClick = () => {
    alert('현재 서비스 준비 중입니다.');
  };

  return (
    <div id="curriculum" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="lecture-curriculum min-w-auto border-t border-gray-200 pt-14">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">커리큘럼</h2>

        {/* <div className="space-y-6"> */}
        {/* 
            curriculum 배열을 map()으로 순회
            - 각 chapter는 하나의 섹션(챕터 단위)
            - index는 각 챕터 구분용 key 값으로 설정
          */}
        {curriculum.map((chapter, index) => (
          <div key={index} className="mb-3 overflow-hidden rounded-xl border border-gray-200">
            {/* 
                각 챕터의 제목 
                - chapterTitle 프로퍼티 사용
                - lessons 배열의 길이를 통해 해당 챕터의 강의 수 계산
                - 옵셔널 체이닝(?.)을 사용해 lessons가 undefined여도 오류 나지 않도록 
              */}
            <div className="bg-white px-4 py-3 font-semibold">
              {chapter.chapterTitle}
              <span className="ml-2 text-sm text-gray-500">({chapter.lessons?.length || 0}강)</span>
            </div>

            {/* 
                lessons 배열 순회
                - 각 챕터 안에 포함된 강의들을 map()으로 렌더링
                - lesson.lessonId를 key로 사용 (고유 ID)
                - 옵셔널 체이닝을 사용하여 lessons가 없을 때 map 실행 방지
              */}
            <div className="">
              {chapter.lessons?.map((lesson) => (
                <div
                  key={lesson.lessonId}
                  className="flex items-center justify-between border-t border-gray-100 bg-white px-4 py-3"
                >
                  {/* 
                      강의 제목 출력
                      - lesson.lessonTitle에서 텍스트 데이터 표시
                      - truncate로 긴 제목이 잘릴 때 ellipsis 처리됨 (UI용)
                    */}
                  <div className="truncate text-zinc-500">{lesson.lessonTitle}</div>

                  {/* 
                      “미리보기” 텍스트
                      - 현재는 단순 표시용이며,
                        추후 클릭 이벤트를 연결해 실제 미리보기 기능 구현 가능                     
                    */}
                  <div
                    className="cursor-pointer text-sm text-gray-500"
                    onClick={handlePreviewClick}
                  >
                    미리보기
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
}

export default LectureCurriculum;
