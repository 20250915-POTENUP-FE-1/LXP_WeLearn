import React from 'react';
import { User } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyPageAsideProfileBar = ({ children }) => {
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();

  return (
    <aside className="lg:col-span-1">
      <div className="rounded-lg bg-white p-6 shadow-md">
        {/* <!-- Profile --> */}
        <div className="profile mb-6 border-b border-gray-200 pb-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
            <span className="text-2xl font-bold text-gray-600">
              <User className="size-14" />
            </span>
          </div>
          <h2 className="mb-1 text-lg font-bold text-gray-900">{user.userName}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* <!-- Menu --> */}
        <nav className="sidebar-menu space-y-1" aria-label="마이페이지 메뉴">
          <button
            onClick={() => navigate('/mypage')}
            className="block w-full rounded-lg bg-gray-900 px-4 py-3 text-left text-sm font-medium text-white"
          >
            수강 중인 강의
          </button>
          {(user.role.toUpperCase() === 'ADMIN' || user.role.toUpperCase() === 'INSTRUCTOR') && (
            <button
              onClick={() => navigate('/mypage/instructor-lectures')}
              className="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              내가 등록한 강의
            </button>
          )}
          <button
            className="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            onClick={() => {
              toast.info('현재 개발 중 입니다.');
            }}
          >
            즐겨찾기
          </button>
        </nav>
      </div>

      {children}
    </aside>
  );
};

export default MyPageAsideProfileBar;
