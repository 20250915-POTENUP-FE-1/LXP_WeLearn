export const validateLogin = (email: string, password: string) => {
  const errors: Record<string, string> = {};

  if (!email.trim()) errors.email = "이메일을 입력해주세요.";
  if (!password.trim() || password.length < 6) errors.password = "비밀번호는 6자 이상입니다.";

  return {
    success: false,
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};