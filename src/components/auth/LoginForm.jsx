import React, { useEffect, useState } from 'react';
import Input from '../common/form/Input.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/auth/login.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearError } from '../../store/auth/authSlice.js';
import InputPassword from '../common/form/InputPassword.jsx';
import GlobalLoading from '../loading/GlobalLoading.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // - 중앙저장소에 관리되는 인증 상태 가져오기
  //   loading: 상태변경 중인지 여부
  //   error: 상태변경 중 발생한 에러 메시지
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // 마운트 될때 에러 초기화
    dispatch(clearError());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(login(formData));

    if (result.meta.requestStatus === 'fulfilled') {
      //location.state?.from이 있는지 확인하고 보내기, 없으면 '/' 로 보내기
      const redirectTo = location.state?.from || '/';
      navigate(redirectTo, { replace: true });
      //  navigate('/');
    }
  };

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          label="이메일"
          id="email"
          name="email"
          type="text"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          aria-required="true"
          placeholder="example@lxp.com"
          required
        />

        <InputPassword
          label="비밀번호"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          aria-required="true"
          placeholder="8자 이상 입력하세요"
          required
        />

        {/* <!-- Remember Me Checkbox --> */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember-me"
            name="remember-me"
            className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900"
          />
          <label className="ml-2 text-sm text-gray-700">로그인 상태 유지</label>
        </div>

        {/* <!-- Submit Button --> */}
        <button
          type="submit"
          className="w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          로그인
        </button>
        {error && <ErrorMessage message={error} />}
      </form>
      {loading ? <GlobalLoading mention="로그인 중 입니다..." /> : null}
    </>
  );
};

export default LoginForm;
