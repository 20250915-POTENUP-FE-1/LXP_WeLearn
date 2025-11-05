import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout.jsx';
import Login from '../pages/login/Login.jsx';
import Signup from '../pages/signup/Signup.jsx';
import MainLayout from '../components/layout/MainLayout.jsx';
import LectureList from '../pages/lectures/list/LectureList.jsx';
import LectureDetail from '../pages/lectures/detail/LectureDetail.jsx';
import { RequireAuth, RequireRole } from '../auth/guards.jsx';
import MyLectures from '../pages/mypage/(user)/my-lectures/MyLectures.jsx';
import CreateLecture from '../pages/mypage/(instructor)/create-lecture/CreateLecture.jsx';
import InstructorLectures from '../pages/mypage/(instructor)/instructor-lectures/InstructorLectures.jsx';
import EditLecture from '../pages/mypage/(instructor)/edit-lecture/EditLecture.jsx';

export const router = createBrowserRouter([
  // 인증(비보호) 라우트
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
    ],
  },

  // 공개 라우트 (로그인 없이 접근 허용)
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/lectures/list" replace /> },
      // 강의 목록/상세는 공개
      {
        path: 'lectures',
        children: [
          { path: 'list', element: <LectureList /> },
          { path: 'detail/:id', element: <LectureDetail /> },
        ],
      },
    ],
  },

  // 마이페이지 (로그인 필요)
  {
    path: '/mypage',
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    children: [
      // 사용자용
      { path: '(user)/my-lectures', element: <MyLectures /> },

      // 강사용(권한 제한)
      {
        path: '(instructor)/instructor-lectures',
        element: (
          <RequireRole allow={['instructor']}>
            <InstructorLectures />
          </RequireRole>
        ),
      },
      {
        path: '(instructor)/create-lecture',
        element: (
          <RequireRole allow={['instructor']}>
            <CreateLecture />
          </RequireRole>
        ),
      },
      {
        path: '(instructor)/edit-lecture/:id',
        element: (
          <RequireRole allow={['instructor']}>
            <EditLecture />
          </RequireRole>
        ),
      },
    ],
  },

  // 에러/기타
  { path: '*', element: <Error /> },
  // { path: '*', element: <Navigate to="/" replace /> },
]);
