import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearError } from '../../store/auth/authSlice.js';
import { signup } from '../../store/auth/signup.js';
import Input from '../common/form/Input.jsx';
import InputPassword from '../common/form/InputPassword.jsx';
import ErrorMessage from '../ui/ErrorMessage.jsx';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [localError, setLocalError] = useState('');

  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 마운트 시 에러 초기화
  useEffect(() => {
    dispatch(clearError());
    setLocalError('');
  }, [dispatch]);

  // 공통 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    // 입력 시 로컬 에러 제거
    if (localError) setLocalError('');
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 클라이언트 검증 (필수)
    if (!formData.userName.trim()) {
      setLocalError('이름을 입력해주세요.');
      return;
    }
    if (formData.password.length < 8) {
      setLocalError('비밀번호는 8자 이상이어야 합니다.');
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      setLocalError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    // 서버 액션 호출
    const result = await dispatch(
      signup({
        email: formData.email,
        password: formData.password,
        userName: formData.userName,
      }),
    );

    console.log(result.meta);
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  const mergedError = localError || error;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="이름"
        id="userName"
        name="userName"
        type="text"
        value={formData.userName}
        onChange={handleChange}
        aria-required="true"
        placeholder="홍길동"
        required
      />

      <Input
        label="이메일"
        id="email"
        name="email"
        type="text"
        value={formData.email}
        onChange={handleChange}
        aria-required="true"
        placeholder="example@lxp.com"
        required
      />

      <InputPassword
        label="비밀번호"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        aria-required="true"
        placeholder="8자 이상 입력하세요"
        required
      />

      <InputPassword
        label="비밀번호 확인"
        id="passwordConfirm"
        name="passwordConfirm"
        value={formData.passwordConfirm}
        onChange={handleChange}
        aria-required="true"
        placeholder="비밀번호를 다시 입력하세요"
        required
      />

      {/* 에러 메시지 */}
      {mergedError && <ErrorMessage message={mergedError} />}

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-gray-900 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        {loading ? '처리 중…' : '회원가입'}
      </button>
    </form>
  );
};

export default SignupForm;
