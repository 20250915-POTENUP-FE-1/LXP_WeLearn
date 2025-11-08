import React from 'react';
import SignupForm from '../../components/auth/signupForm.jsx';

const Signup = () => {
  return (
    <div className="flex min-w-md flex-col items-center justify-center px-4 py-12 sm:py-16">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">회원가입</h1>
        <p className="text-base text-gray-600">LXP와 함께 학습을 시작하세요</p>
      </div>

      <div className="w-full rounded-xl bg-white p-8 shadow-lg">
        <SignupForm />
      </div>

      <div className="signup-footer mt-6 text-center">
        <p className="text-sm text-gray-600">
          이미 계정이 있으신가요?
          <a href="/login" className="font-medium text-gray-900 hover:underline">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
