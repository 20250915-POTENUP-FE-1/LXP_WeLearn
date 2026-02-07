export const validateSignup = (data:Record<string, string>) =>{
  const errors:Record<string, string> = {}

  if(!data.nickname?.trim()) errors.nickname = "닉네임은 한글자 이상 입력해주세요.";
  if(!data.email?.trim()) errors.email = "이메일을 입력해주세요.";
  if(!data.password?.trim() || data.password.length <6) errors.password = "비밀번호는 6자 이상 입력해주세요.";
  if(data.password !== data.confirmPassword) errors.confirmPassword = "비밀번호가 같지 않습니다.";

  return {
    success: false,
    errors,
    isValid: Object.keys(errors).length === 0
  }
}