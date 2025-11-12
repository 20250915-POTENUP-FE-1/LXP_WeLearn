import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

/** 새 강의 만들기 액션 카드 */
const CreateBtnLectureCard = () => {
  const navigate = useNavigate();
  const handleCreateLecture = () => navigate('/mypage/create-lecture');

  return (
    <div className="quick-actions mb-8">
      <button
        onClick={handleCreateLecture}
        aria-label="새 강의 만들기"
        className="cursor block w-full rounded-lg bg-zinc-900 p-6 text-white shadow-md duration-200 ease-out hover:-translate-y-1 hover:bg-zinc-800 hover:shadow-lg"
      >
        <div className="flex items-center justify-between">
          <div className="text-left">
            <h3 className="mb-2 text-lg font-bold">새 강의 만들기</h3>
            <p className="text-sm text-gray-300">지식을 공유하고 학생들과 함께 성장하세요</p>
          </div>
          <Plus />
        </div>
      </button>
    </div>
  );
};

export default CreateBtnLectureCard;
