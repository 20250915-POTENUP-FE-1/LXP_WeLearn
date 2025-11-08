export const lecture_list = [
  {
    lectureId: 'lec001',
    title: '웹 접근성과 성능 최적화',
    description: '모두를 위한, 빠른 웹사이트 만들기',
    content:
      '웹 접근성 표준을 준수하고 성능을 극대화하는 프론트엔드 개발 기법을 배웁니다. WCAG 가이드라인 이해, 시맨틱 HTML 작성, ARIA 속성 활용, 키보드 네비게이션 구현을 실습합니다. Lighthouse 점수 개선, Core Web Vitals 최적화, 이미지 lazy loading, 코드 스플리팅 전략을 배우며, 번들 사이즈 분석과 트리 쉐이킹, 캐싱 전략을 통해 로딩 속도를 향상시킵니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-01.png',
    userId: 'user001',
    userName: '윤강사',
    category: 2,
    level: '초급',
    studentCount: 10,
    lectureCreatedAt: '2025-11-10T00:10:00Z',
    curriculum: [
      {
        chapterTitle: '접근성 기본 이해',
        lessons: [
          {
            lessonId: 'l001-1',
            lessonTitle: '웹 접근성의 개념과 중요성',
            lessonMediaUrl: '/media/lesson1.mp4',
          },
          {
            lessonId: 'l001-2',
            lessonTitle: 'WCAG 가이드라인 살펴보기',
            lessonMediaUrl: '/media/lesson2.mp4',
          },
        ],
      },
      {
        chapterTitle: '성능 최적화 실습',
        lessons: [
          {
            lessonId: 'l001-3',
            lessonTitle: 'Lighthouse로 사이트 분석하기',
            lessonMediaUrl: '/media/lesson3.mp4',
          },
          {
            lessonId: 'l001-4',
            lessonTitle: '이미지 최적화와 Lazy Loading',
            lessonMediaUrl: '/media/lesson4.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec002',
    title: 'React 훅 완전 정복',
    description: 'useState부터 useReducer까지, 실무에서 바로 쓰는 훅 가이드',
    content:
      'React의 핵심 훅들을 실제 예제와 함께 학습합니다. 상태 관리, 렌더링 최적화, 커스텀 훅 제작 방법을 배우며, 컴포넌트 구조 설계와 리팩토링 실습을 통해 실무 감각을 익힙니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-06.png',
    userId: 'user002',
    userName: '이강사',
    category: 1,
    level: '중급',
    studentCount: 25,
    lectureCreatedAt: '2025-10-20T09:00:00Z',
    curriculum: [
      {
        chapterTitle: '핵심 훅 이해하기',
        lessons: [
          {
            lessonId: 'l002-1',
            lessonTitle: 'useState와 useEffect 기본',
            lessonMediaUrl: '/media/hooks1.mp4',
          },
          {
            lessonId: 'l002-2',
            lessonTitle: '의존성 배열 제대로 이해하기',
            lessonMediaUrl: '/media/hooks2.mp4',
          },
        ],
      },
      {
        chapterTitle: '커스텀 훅 만들기',
        lessons: [
          {
            lessonId: 'l002-3',
            lessonTitle: '반복 로직 분리하기',
            lessonMediaUrl: '/media/hooks3.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec003',
    title: 'Node.js로 배우는 백엔드 기본기',
    description: 'Express로 REST API 만들기부터 배포까지',
    content:
      'Node.js 환경 구성, Express 라우팅, 미들웨어, 에러 핸들링, MongoDB 연결 등 백엔드 기초를 실습합니다. Postman으로 API 테스트를 수행하고, 배포 자동화 파이프라인까지 경험합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-05.png',
    userId: 'user003',
    userName: '박강사',
    category: 3,
    level: '초급',
    studentCount: 18,
    lectureCreatedAt: '2025-09-15T14:30:00Z',
    curriculum: [
      {
        chapterTitle: 'Node.js 시작하기',
        lessons: [
          {
            lessonId: 'l003-1',
            lessonTitle: 'Node.js란 무엇인가',
            lessonMediaUrl: '/media/node1.mp4',
          },
          {
            lessonId: 'l003-2',
            lessonTitle: 'Express 서버 세팅',
            lessonMediaUrl: '/media/node2.mp4',
          },
        ],
      },
      {
        chapterTitle: 'API 개발 실습',
        lessons: [
          {
            lessonId: 'l003-3',
            lessonTitle: 'RESTful API 설계',
            lessonMediaUrl: '/media/node3.mp4',
          },
          {
            lessonId: 'l003-4',
            lessonTitle: '데이터베이스 연결과 CRUD',
            lessonMediaUrl: '/media/node4.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec004',
    title: 'Tailwind CSS로 디자인 시스템 구축',
    description: '디자이너 없이도 세련된 UI 만들기',
    content:
      'Tailwind CSS의 유틸리티 퍼스트 철학을 이해하고, 반응형 그리드와 컴포넌트 아키텍처를 구성합니다. 디자인 토큰과 커스텀 테마를 설정하며, LXP 프로젝트를 위한 UI 시스템을 완성합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-04.png',
    userId: 'user004',
    userName: '장강사',
    category: 4,
    level: '상급',
    studentCount: 40,
    lectureCreatedAt: '2025-11-01T18:20:00Z',
    curriculum: [
      {
        chapterTitle: 'Tailwind 기초 다지기',
        lessons: [
          {
            lessonId: 'l004-1',
            lessonTitle: '설치와 기본 설정',
            lessonMediaUrl: '/media/tw1.mp4',
          },
          {
            lessonId: 'l004-2',
            lessonTitle: '유틸리티 클래스 활용법',
            lessonMediaUrl: '/media/tw2.mp4',
          },
        ],
      },
      {
        chapterTitle: '디자인 시스템 구현',
        lessons: [
          {
            lessonId: 'l004-3',
            lessonTitle: '컴포넌트 설계와 커스터마이징',
            lessonMediaUrl: '/media/tw3.mp4',
          },
          {
            lessonId: 'l004-4',
            lessonTitle: '반응형 디자인 패턴',
            lessonMediaUrl: '/media/tw4.mp4',
          },
        ],
      },
    ],
  },
];
