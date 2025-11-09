import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthSelector } from '../../hooks/guard/useAuthSelector';

function EnrollButton({ className }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, initializing } = useAuthSelector();

  const handleClick = () => {
    // 중복 동작 방지
    if (initializing) return;

    // 1) 비로그인 사용자가 클릭했을 때 -> 로그인 페이지로 이동
    // 로그인 후 리다이렉트할 경로 전달
    if (!user) {
      navigate('/login', {
        state: { from: location.pathname }, // 예: '/lectures/lec001'
      });
      return;
    }
    // 2) 로그인 상태일 때 -> 중복 신청 체크, 수강인원 수 업데이트 등
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        aria-busy={initializing}
        // 접근성
        className={[
          'w-full rounded-lg bg-gray-900 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none',
          className,
        ].join('')}
        aria-label="수강 신청"
      >
        수강신청
      </button>
    </div>
  );
}

export default EnrollButton;
