import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthLayout from '../components/layout/AuthLayout.jsx';
import Login from '../pages/login/Login.jsx';
import Signup from '../pages/signup/Signup.jsx';
import MainLayout from '../components/layout/MainLayout.jsx';
import LectureList from '../pages/lectures/list/LectureList.jsx';
import LectureDetail from '../pages/lectures/detail/LectureDetail.jsx';
import { RequireAuth, RequireRole, RequireUnAuth } from '../auth/guards.jsx';
import MyLectures from '../pages/mypage/(user)/my-lectures/MyLectures.jsx';
import CreateLecture from '../pages/mypage/(instructor)/create-lecture/CreateLecture.jsx';
import InstructorLectures from '../pages/mypage/(instructor)/instructor-lectures/InstructorLectures.jsx';
import EditLecture from '../pages/mypage/(instructor)/edit-lecture/EditLecture.jsx';
import Error404 from '../pages/Error/404/Error404.jsx';
import Error403 from '../pages/Error/403/Error403.jsx';

export const router = createBrowserRouter([
  // 인증(비보호) 라우트
  {
    path: '/',
    element: (
      <RequireUnAuth>
        <AuthLayout />
      </RequireUnAuth>
    ),
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
      { index: true, element: <Navigate to="/lectures" replace /> },
      // 강의 목록/상세는 공개
      {
        path: 'lectures',
        children: [
          { index: true, element: <LectureList /> },
          { path: 'detail/:lectureId', element: <LectureDetail /> },
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
      { path: 'my-lectures', element: <MyLectures /> },

      // 강사용(권한 제한)
      {
        path: 'instructor-lectures',
        element: (
          <RequireRole allow={['INSTRUCTOR']}>
            <InstructorLectures />
          </RequireRole>
        ),
      },
      {
        path: 'create-lecture',
        element: (
          <RequireRole allow={['INSTRUCTOR']}>
            <CreateLecture />
          </RequireRole>
        ),
      },
      { path: 'edit-lecture', element: <EditLecture /> },
      {
        path: 'edit-lecture/:id?',
        element: (
          <RequireRole allow={['INSTRUCTOR']}>
            <EditLecture />
          </RequireRole>
        ),
      },
    ],
  },

  // 에러/기타
  { path: '*', element: <Error404 /> },
  { path: '/403', element: <Error403 /> },
]);
