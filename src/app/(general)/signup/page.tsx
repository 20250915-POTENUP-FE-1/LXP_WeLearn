'use client'

// ============================================
// Page: 회원가입 페이지
// Route: /signup
// Access: 공개 (비로그인 사용자)
// Description: 이름, 이메일, 비밀번호로 회원가입하는 페이지
// Tailwind: flex로 중앙 정렬, min-h-screen으로 전체 높이
// ============================================

import React, { useState } from 'react'

// 폼 데이터 타입 정의
interface SignupFormData {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

// ============================================
// SignupPage Component
// Description: 회원가입 페이지 메인 컴포넌트
// ============================================
export default function SignupPage() {
  // 폼 상태 관리
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  // 비밀번호 표시 상태
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  // 입력값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 비밀번호 표시 토글
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  // 비밀번호 확인 표시 토글
  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm((prev) => !prev)
  }

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 비밀번호 일치 확인
    if (formData.password !== formData.passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }

    console.log('Signup submitted:', formData)
    // 실제 구현 시 회원가입 API 호출
  }

  return (
    <>
      {/* ============================================ */}
      {/* Main Content */}
      {/* Description: 회원가입 폼 중앙 배치 */}
      {/* Tailwind: flex-1로 남은 공간 채우기, items-center justify-center로 중앙 정렬 */}
      {/* ============================================ */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* ============================================ */}
          {/* Signup Form Header */}
          {/* Description: 제목과 설명 */}
          {/* ============================================ */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">회원가입</h1>
            <p className="text-sm text-gray-500">Welearn과 함께 학습을 시작하세요.</p>
          </div>

          {/* ============================================ */}
          {/* Signup Form */}
          {/* Description: 이름, 이메일, 비밀번호, 비밀번호 확인 입력 폼 */}
          {/* Tailwind: bg-white로 카드 배경, rounded-xl로 모서리 둥글게 */}
          {/* ============================================ */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 이름 입력 */}
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="홍길동"
                  required
                  autoComplete="name"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
                />
              </div>

              {/* 이메일 입력 */}
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@lxp.com"
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
                />
              </div>

              {/* 비밀번호 입력 */}
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                  비밀번호 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="8자 이상 입력하세요"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
                  />
                  {/* 비밀번호 표시/숨김 토글 버튼 */}
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 transition-colors hover:text-gray-600"
                    aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* 비밀번호 확인 입력 */}
              <div>
                <label
                  htmlFor="passwordConfirm"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  비밀번호 확인 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPasswordConfirm ? 'text' : 'password'}
                    id="passwordConfirm"
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleInputChange}
                    placeholder="비밀번호를 다시 입력하세요"
                    required
                    minLength={8}
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-sm placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-500 focus:outline-none"
                  />
                  {/* 비밀번호 확인 표시/숨김 토글 버튼 */}
                  <button
                    type="button"
                    onClick={togglePasswordConfirmVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 transition-colors hover:text-gray-600"
                    aria-label={showPasswordConfirm ? '비밀번호 숨기기' : '비밀번호 표시'}
                  >
                    {showPasswordConfirm ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* 회원가입 버튼 */}
              <button
                type="submit"
                className="w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none"
              >
                회원가입
              </button>
            </form>
          </div>

          {/* ============================================ */}
          {/* Login Link */}
          {/* Description: 로그인 페이지 링크 */}
          {/* ============================================ */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              이미 계정이 있으신가요?{' '}
              <a href="/login" className="font-medium text-gray-900 hover:underline">
                로그인
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
