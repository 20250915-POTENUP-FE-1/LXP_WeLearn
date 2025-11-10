import React from 'react';
import { useNavigate } from 'react-router-dom';

/** 새 강의 만들기 액션 카드 */
const CreateBtnLectureCard = () => {
  const navigate = useNavigate();
  const handleCreateLecture = () => navigate('/mypage/create-lecture');

  return (
    <div className="quick-actions mb-8">
      <button
        onClick={handleCreateLecture}
        aria-label="새 강의 만들기"
        className="block w-full rounded-lg bg-gray-900 p-6 text-white transition-colors hover:bg-gray-800"
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h3 className="mb-2 text-lg font-bold">새 강의 만들기</h3>
            <p className="text-sm text-gray-300">지식을 공유하고 학생들과 함께 성장하세요</p>
          </div>
          <svg className="h-8 w-8 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default CreateBtnLectureCard;
