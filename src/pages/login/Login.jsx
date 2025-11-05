import React from 'react';

const Login = () => {
  return (
    <div className="m-auto">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">로그인</h1>
      </div>

      <form
        className="m-auto grid min-w-[520px] gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        noValidate
      >
        <div className="mb-3 grid gap-1.5">
          <label htmlFor="lemail" className="font-medium">
            이메일 *
          </label>
          <input
            id="lemail"
            name="email"
            type="email"
            className="input w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            autoComplete="email"
            required
          />
        </div>

        <div className="mb-3 grid gap-1.5">
          <label htmlFor="lpw" className="font-medium">
            비밀번호 *
          </label>
          <input
            id="lpw"
            name="pw"
            type="password"
            className="input w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            autoComplete="current-password"
            required
          />
        </div>

        <div className="grid justify-items-start gap-2">
          <button
            type="submit"
            className="btn w-full rounded-md bg-blue-600 py-3 text-lg text-white transition-colors hover:bg-blue-700"
          >
            로그인
          </button>
          <p className="text-sm text-gray-500">
            계정이 없나요?{' '}
            <a href="/signup" className="text-blue-600 hover:underline">
              회원가입
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
