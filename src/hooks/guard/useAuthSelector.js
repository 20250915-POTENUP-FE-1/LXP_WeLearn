import { useSelector } from 'react-redux';

/**
 * 전역 인증 상태 조회 훅 (읽기 전용)
 *
 * @returns {{
 *   user: { uid:string|null, email:string|null, role:string|null, name:string } | null,
 *   initializing: boolean
 * }}
 *
 * @param Redux.auth.user {object|null} 인증된 사용자 정보
 * @param Redux.auth.initializing {boolean} 전역 인증 초기 확인 상태
 */

export function useAuthSelector() {
  const user = useSelector((state) => state.auth.user);
  const initializing = useSelector((state) => state.auth.initializing);
  return { user, initializing };
}
