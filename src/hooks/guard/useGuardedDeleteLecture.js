import { useCallback, useState } from 'react';
import { toast as defaultToast } from 'react-toastify';
import { getEnrollmentCountByLecture } from '../../services/lecture/getEnrollmentCountByLecture.js';
import { deleteLectureService } from '../../services/lecture/deleteLectureService.js';
/**
 * 강의 삭제 훅: 수강생 ≥ 1이면 차단, 0이면 삭제
 * @param {Object} opt
 * @param {Function=} opt.onSuccess  삭제 성공 후 콜백
 * @param {Function=} opt.onBlocked  차단(수강생 존재) 시 콜백
 * @param {Function=} opt.onError    에러 시 콜백
 * @param {Object=}   opt.toast      커스텀 토스트 객체 (info/success/error 메서드 보유)
 * @param {Function=} opt.confirmFn  확인 함수 (기본: window.confirm)
 */
export function useGuardedDeleteLecture(opt = {}) {
  const {
    onSuccess,
    onBlocked,
    onError,
    toast = defaultToast,
    confirmFn = (msg) => window.confirm(msg),
  } = opt;

  const [removingId, setRemovingId] = useState(null);

  const handleDelete = useCallback(
    async ({ id, lectureId }) => {
      const ok = confirmFn('이 강의를 삭제할까요? 삭제 후 복구할 수 없습니다.');
      if (!ok) return;

      try {
        setRemovingId(id);

        // 1) 수강생 수 조회
        const count = await getEnrollmentCountByLecture(lectureId);

        // 2) 조건
        if (count >= 1) {
          toast.info('수강 중인 학생이 있어 삭제할 수 없습니다.');
          onBlocked?.({ id, lectureId, count });
          return;
        }

        // 3) 삭제 실행
        await deleteLectureService(id);
        toast.success('강의가 삭제되었습니다.');
        onSuccess?.({ id, lectureId });
      } catch (error) {
        toast.error('삭제 처리 중 문제가 발생했습니다.');
        onError?.(error);
        console.error(error);
      } finally {
        setRemovingId(null);
      }
    },
    [confirmFn, onBlocked, onSuccess, onError, toast],
  );

  return { handleDelete, removingId };
}
