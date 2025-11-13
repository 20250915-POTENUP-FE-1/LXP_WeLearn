import React from 'react';
import { User } from 'lucide-react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const MyPageAsideProfileBar = ({ children }) => {
  const { user } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside className="lg:col-span-1">
      <div className="rounded-lg bg-white p-6 shadow-md">
        {/* Profile */}
        <div className="profile mb-6 border-b border-gray-200 pb-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-[#EA4848] to-[#ee9393]">
            <User className="size-14 text-white/80" />
          </div>

          <h2 className="mb-1 text-lg font-bold text-gray-900">{user.userName}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Menu */}
        <nav className="sidebar-menu space-y-1" aria-label="마이페이지 메뉴">
          {/* 수강 중인 강의 */}
          <button
            onClick={() => navigate('/mypage/my-lectures')}
            className={classNames(
              'block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors',
              pathname === '/mypage/my-lectures'
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-50',
            )}
          >
            수강 중인 강의
          </button>

          {/* 내가 등록한 강의 (강사용) */}
          {(user.role.toUpperCase() === 'ADMIN' || user.role.toUpperCase() === 'INSTRUCTOR') && (
            <button
              onClick={() => navigate('/mypage/instructor-lectures')}
              className={classNames(
                'block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors',
                pathname === '/mypage/instructor-lectures'
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-50',
              )}
            >
              내가 등록한 강의
            </button>
          )}

          {/* 즐겨찾기 */}
          <button
            onClick={() => {
              toast.info('현재 서비스 준비 중 입니다.', { toastId: 'mypage-prepare' });
            }}
            className={classNames(
              'block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors',
              pathname === '/mypage/favorites'
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-50',
            )}
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
