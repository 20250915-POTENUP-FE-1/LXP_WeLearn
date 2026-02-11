import { PasswordUpdateRequest } from '@/types/user/user';

export const validatePasswordChange = (passwords:PasswordUpdateRequest ) => {
  const { currentPassword, newPassword, newPasswordConfirm } = passwords;
  const errors: Record<string, string> = {};

  if (!currentPassword.trim()) errors.currentPassword = "현재 비밀번호를 입력해주세요.";
  if (!newPassword.trim()) errors.newPassword = "새 비밀번호를 입력해주세요.";
  if (!newPasswordConfirm?.trim()) errors.newPasswordConfirm = "새 비밀번호 확인을 입력해주세요.";

  if (currentPassword && newPassword && currentPassword === newPassword) {
    errors.newPassword = "현재 비밀번호와 새 비밀번호가 동일합니다.";
  }

  if (newPassword && newPasswordConfirm && newPassword !== newPasswordConfirm) {
    errors.newPasswordConfirm = "새 비밀번호가 일치하지 않습니다.";
  }

  if (newPassword && newPassword.length < 6) {
    errors.newPassword = "비밀번호는 최소 6자 이상입니다.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};