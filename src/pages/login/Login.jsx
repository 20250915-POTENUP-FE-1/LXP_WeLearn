import React from 'react';
import FormTitleSection from '../../components/common/form/FormTitleSection.jsx';
import LoginForm from '../../components/auth/LoginForm.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-w-md flex-col items-center justify-center px-4 py-12 sm:py-16">
      <FormTitleSection title="로그인" subTitle="학습을 계속하려면 로그인하세요" />

      <div className="w-full rounded-xl bg-white p-8 shadow-lg">
        <LoginForm />
      </div>

      <div className="login-footer mt-6 text-center">
        <div className="text-sm text-gray-600">
          계정이 없으신가요?
          <div
            onClick={() => navigate('/signup')}
            className="font-medium text-gray-900 hover:underline"
          >
            회원가입
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
