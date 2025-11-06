import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header sticky top-0 z-50 bg-white shadow-md">
      <div className="header__container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* <!-- Logo Section --> */}
          <div className="header__logo flex flex-shrink-0 items-center">
            <a
              href="/lectures"
              className="header__logo-link flex items-center space-x-2"
              aria-label="홈으로 이동"
            >
              <div className="header__logo-icon flex h-8 w-8 items-center justify-center rounded-lg bg-gray-900">
                <span className="text-lg font-bold text-white">L</span>
              </div>
              <span className="hidden text-xl font-bold text-gray-900 sm:block">LXP</span>
            </a>
          </div>

          {/* <!-- Search Bar (Center) --> */}
          <div className="header__search mx-4 hidden max-w-2xl flex-1 md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="강의명, 강사명으로 검색하세요"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
              />
              <button
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="검색"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* <!-- Navigation & Auth Section --> */}
          <div className="header__right flex flex-shrink-0 items-center space-x-4">
            {/* <!-- Category Dropdown - Desktop --> */}
            <nav className="hidden items-center space-x-6 md:flex" aria-label="주요 메뉴">
              <div className="header__category group relative">
                <button className="flex items-center space-x-1 text-gray-700 transition-colors hover:text-gray-900">
                  <span className="text-sm font-medium">카테고리</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* <!-- Dropdown Menu --> */}
                <div className="header__dropdown invisible absolute top-full right-0 mt-2 w-48 rounded-lg bg-white opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                  <div className="py-2">
                    <a
                      href="/lectures?category=development"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      개발
                    </a>
                    <a
                      href="/lectures?category=design"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      디자인
                    </a>
                    <a
                      href="/lectures?category=business"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      비즈니스
                    </a>
                    <a
                      href="/lectures?category=marketing"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      마케팅
                    </a>
                  </div>
                </div>
              </div>
            </nav>

            {/* <!-- Auth Buttons --> */}
            <div className="header__auth hidden items-center space-x-3 md:flex">
              <a
                href="/login"
                className="text-sm font-medium whitespace-nowrap text-gray-700 transition-colors hover:text-gray-900"
              >
                로그인
              </a>
              <a
                href="/signup"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition-colors hover:bg-gray-800"
              >
                회원가입
              </a>
            </div>

            {/* <!-- Mobile Menu Toggle --> */}
            <button
              className="header__mobile-toggle rounded-lg p-2 text-gray-600 hover:text-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none md:hidden"
              aria-label="메뉴 열기"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* <!-- Mobile Search Bar --> */}
        <div className="header__search-mobile pb-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="강의명, 강사명으로 검색하세요"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none"
            />
            <button
              className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="검색"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* <!-- Mobile Navigation Menu --> */}
        <div className="header__mobile-menu hidden border-t border-gray-200 md:hidden">
          <div className="space-y-3 px-4 py-3">
            <a
              href="/lectures?category=development"
              className="block text-base font-medium text-gray-700 hover:text-gray-900"
            >
              개발
            </a>
            <a
              href="/lectures?category=design"
              className="block text-base font-medium text-gray-700 hover:text-gray-900"
            >
              디자인
            </a>
            <a
              href="/lectures?category=business"
              className="block text-base font-medium text-gray-700 hover:text-gray-900"
            >
              비즈니스
            </a>
            <a
              href="/lectures?category=marketing"
              className="block text-base font-medium text-gray-700 hover:text-gray-900"
            >
              마케팅
            </a>
            <div className="space-y-3 border-t border-gray-200 pt-3">
              <a
                href="/login"
                className="block text-base font-medium text-gray-700 hover:text-gray-900"
              >
                로그인
              </a>
              <a
                href="/signup"
                className="block text-base font-medium text-gray-700 hover:text-gray-900"
              >
                회원가입
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
