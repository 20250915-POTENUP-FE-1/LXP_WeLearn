import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth/logout.js';
import SkeletonButton from '../ui/SkeletonButton.jsx';
import { toast } from 'react-toastify';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { initializing, user } = useSelector((s) => s.auth);
  const { pathname } = useLocation();

  const handleNavi = (location) => {
    navigate(location);
  };

  const handleLogout = async () => {
    await dispatch(logout());

    if (pathname.startsWith('/mypage')) {
      handleNavi('/'); // 로그아웃 후 홈 등으로
    }
    toast.info('로그아웃 되었습니다.');
  };

  return (
    <header className="header sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* <!-- Logo Section --> */}
          <div className="flex shrink-0 items-center">
            <button
              onClick={() => handleNavi('/lectures')}
              className="flex items-center space-x-2"
              aria-label="홈으로 이동"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
                <span className="text-lg font-bold text-white">L</span>
              </div>
              <span className="hidden text-xl font-bold text-gray-900 sm:block">LXP</span>
            </button>
          </div>

          {/* <!-- Navigation & Auth Section --> */}
          <div className="flex shrink-0 items-center space-x-4">
            <div className="hidden items-center space-x-3 md:flex">
              {initializing ? (
                <>
                  <SkeletonButton className="h-5 w-16 rounded" />
                  <SkeletonButton className="h-9 w-20 rounded-lg" />
                </>
              ) : user ? (
                <>
                  <button
                    onClick={() => handleNavi('/mypage')}
                    className="text-sm font-medium whitespace-nowrap text-gray-700 transition-colors hover:text-gray-900"
                  >
                    마이페이지
                  </button>
                  <button
                    onClick={handleLogout}
                    className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium whitespace-nowrap text-gray-900 transition-colors hover:bg-white"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavi(`/login`)}
                    className="text-sm font-medium whitespace-nowrap text-gray-700 transition-colors hover:text-gray-900"
                  >
                    로그인
                  </button>
                  <button
                    onClick={() => handleNavi(`/signup`)}
                    className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-gray-800"
                  >
                    회원가입
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
