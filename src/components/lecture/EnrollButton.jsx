import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthSelector } from '../../hooks/guard/useAuthSelector';
import { db } from '../../lib/firebase/config.js';
import { ENROLLMENTS_COLLECTION_NAME } from '../../lib/firebase/table/ddl.js';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  increment,
} from 'firebase/firestore';

/**
 * 수강 신청 버튼 컴포넌트
 *
 * @param {string} [props.className] - 부모 컴포넌트에서 버튼 css 변경 가능
 * @param {string} props.lectureId - 수강 신청할 강의 고유 ID
 * @param {string} props.firestoreDocId - Firestore 문서 ID
 * @param {string} props.instructorId - 강의를 등록한 강사의 userId
 * @param {Function} props.onEnrollSuccess - 수강 신청 성공 시 호출 함수
 *
 */

function EnrollButton({ className, lectureId, firestoreDocId, instructorId, onEnrollSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, initializing } = useAuthSelector();

  // 수강 신청 여부 상태
  const [isEnrolled, setIsEnrolled] = useState(false);
  // 확인 중 상태
  const [checkEnrollment, setCheckEnrollment] = useState(true);

  useEffect(() => {
    const checkEnrollment = async () => {
      // 비로그인 상태면 확인 안해도 됨
      if (!user || !lectureId) {
        setCheckEnrollment(false);
        return;
      }
      try {
        const enrollmentsRef = collection(db, 'enrollments');
        const q = query(
          enrollmentsRef,
          where('userId', '==', user.uid),
          where('lectureId', '==', lectureId),
        );
        const querySnapshot = await getDocs(q);

        setIsEnrolled(!querySnapshot.empty);
      } catch (error) {
        console.log('수강 신청 확인 중 오류:', error);
      } finally {
        setCheckEnrollment(false);
      }
    };
    checkEnrollment();
  }, [user, lectureId]);

  // 수강 신청 버튼 클릭 핸들러
  const handleClick = async () => {
    // 중복 동작 방지
    if (initializing) return;

    // 1) 비로그인 사용자가 클릭했을 때 -> 로그인 페이지로 이동 -  로그인 후 리다이렉트할 경로 전달
    if (!user) {
      navigate('/login', {
        state: { from: location.pathname },
        replace: false,
      });
      return;
    }

    if (isEnrolled) {
      alert('이미 신청한 강의 입니다. 마이페이지에서 확인해보세요.');
      return;
    }

    // 2) 로그인 상태일 때 -> 중복 신청 확인, 수강인원 수 업데이트
    try {
      // console.log('수강 신청 시작:', { userId: user.uid, lectureId, firestoreDocId });

      // 2-1) 중복 신청 확인하기
      const enrollmentsRef = collection(db, ENROLLMENTS_COLLECTION_NAME);
      const q = query(
        enrollmentsRef,
        where('userId', '==', user.uid),
        where('lectureId', '==', lectureId),
      );
      const querySnapshot = await getDocs(q);

      // 이미 신청한 강의인 경우
      if (!querySnapshot.empty) {
        alert('이미 신청한 강의입니다. 마이페이지에서 확인해보세요.');
        setIsEnrolled(true);
        return;
      }

      // 2-2) 처음 신청한 강의 => 수강 신청 처리
      // Firestore에 데이터 기록
      await addDoc(enrollmentsRef, {
        userId: user.uid,
        lectureId: lectureId,
        enrolledAt: new Date(),
        status: 'active',
        //  수강 상태 표시 'active', 'completed', 'cancelled'
      });

      // 3) 수강 신청 완료 안내 + 해당 강의 수강 인원 수 증가
      const lectureDocRef = doc(db, 'lecture-list', firestoreDocId);
      await updateDoc(lectureDocRef, {
        studentCount: increment(1),
      });
      console.log('수강 인원 추가 완료');

      // 수강 신청 성공 시 상태 업데이트
      setIsEnrolled(true);
      if (onEnrollSuccess) {
        onEnrollSuccess(); // 부모 컴포넌트에 알려주기
      }
      // alert('수강 신청이 완료되었습니다.');
    } catch (error) {
      console.log('수강 신청 중 오류:', error);
      alert('수강 신청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 수정하기 버튼 클릭 핸들러
  const handleClickEdit = () => {
    navigate(`/edit-lecture/${lectureId}`);
  };

  // 자신이 등록한 강의인 경우 - 수정하기 버튼 제공
  if (user && user.uid === instructorId) {
    return (
      <div>
        <button
          type="button"
          onClick={handleClickEdit}
          className={[
            'w-full rounded-lg bg-blue-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none',
            className,
          ].join(' ')}
          aria-label="강의 수정하기"
        >
          수정하기
        </button>
      </div>
    );
  }

  // 이미 수강 중인 경우
  if (isEnrolled) {
    return (
      <div>
        <button
          type="button"
          disabled
          className="w-full cursor-not-allowed rounded-lg bg-gray-300 px-8 py-3 text-base font-medium text-white"
          aria-label="수강 중"
        >
          수강 중
        </button>
      </div>
    );
  }

  //  일반 사용자 또는 비로그인 사용자 수강 신청 버튼
  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        aria-busy={initializing}
        className={[
          'w-full rounded-lg bg-gray-900 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-gray-800 focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:outline-none',
          className,
        ].join('')}
        aria-label="수강 신청"
      >
        {checkEnrollment ? '확인 중' : '수강 신청'}
      </button>
    </div>
  );
}

export default EnrollButton;
