export const lecture_list = [
  {
    lectureId: 'lec1',
    title: '웹 접근성과 성능 최적화',
    description: '모두를 위한, 빠른 웹사이트 만들기',
    content:
      '웹 접근성 표준을 준수하고 성능을 극대화하는 프론트엔드 개발 기법을 배웁니다. WCAG 가이드라인 이해, 시맨틱 HTML 작성, ARIA 속성 활용, 키보드 네비게이션 구현을 실습합니다. Lighthouse 점수 개선, Core Web Vitals 최적화, 이미지 lazy loading, 코드 스플리팅 전략을 배우며, 번들 사이즈 분석과 트리 쉐이킹, 캐싱 전략을 통해 로딩 속도를 향상시킵니다. 실무에서 바로 적용할 수 있는 최적화 기법들을 단계별로 학습하고, 실제 프로젝트에 적용하는 방법을 익힙니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-01.png',
    userId: 'user1',
    userName: '김민준',
    category: 2,
    level: '초급',
    studentCount: 10,
    lectureCreatedAt: '2025-11-10T00:10:00Z',
    curriculum: [
      {
        chapterTitle: '접근성 기본 이해',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '웹 접근성의 개념과 중요성',
            lessonMediaUrl: '/media/lesson1.mp4',
          },
          {
            lessonId: 'less1-2',
            lessonTitle: 'WCAG 가이드라인 살펴보기',
            lessonMediaUrl: '/media/lesson2.mp4',
          },
        ],
      },
      {
        chapterTitle: '성능 최적화 실습',
        lessons: [
          {
            lessonId: 'less2-1',
            lessonTitle: 'Lighthouse로 사이트 분석하기',
            lessonMediaUrl: '/media/lesson3.mp4',
          },
          {
            lessonId: 'less2-2',
            lessonTitle: '이미지 최적화와 Lazy Loading',
            lessonMediaUrl: '/media/lesson4.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec2',
    title: 'React 훅 완전 정복',
    description: 'useState부터 useReducer까지, 실무에서 바로 쓰는 훅',
    content:
      'React의 핵심 훅들을 실제 예제와 함께 학습합니다. useState로 상태 관리의 기초를 다지고, useEffect로 사이드 이펙트를 처리하는 방법을 배웁니다. useContext를 활용한 전역 상태 관리, useMemo와 useCallback을 통한 성능 최적화, useRef로 DOM 요소 직접 접근하기 등 실무 필수 훅들을 마스터합니다. 또한 커스텀 훅을 만들어 로직을 재사용하는 방법과 복잡한 상태를 useReducer로 관리하는 패턴을 학습합니다. 실제 프로젝트 예제를 통해 훅의 활용법을 체득합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-06.png',
    userId: 'user2',
    userName: '이서연',
    category: 1,
    level: '중급',
    studentCount: 25,
    lectureCreatedAt: '2025-10-20T09:00:00Z',
    curriculum: [
      {
        chapterTitle: '핵심 훅 이해하기',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'useState와 useEffect 기본',
            lessonMediaUrl: '/media/hooks1.mp4',
          },
          {
            lessonId: 'less1-2',
            lessonTitle: '의존성 배열 제대로 이해하기',
            lessonMediaUrl: '/media/hooks2.mp4',
          },
        ],
      },
      {
        chapterTitle: '커스텀 훅 만들기',
        lessons: [
          {
            lessonId: 'less2-1',
            lessonTitle: '반복 로직 분리하기',
            lessonMediaUrl: '/media/hooks3.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec3',
    title: 'TypeScript 실전 가이드',
    description: '타입 안정성으로 버그 없는 코드 작성하기',
    content:
      'TypeScript의 기본 타입부터 고급 타입까지 단계별로 학습합니다. 인터페이스와 타입 별칭의 차이점, 제네릭을 활용한 재사용 가능한 컴포넌트 작성, 유틸리티 타입으로 코드 간결화하기를 배웁니다. React와 TypeScript를 함께 사용할 때의 베스트 프랙티스, Props 타입 정의, 이벤트 핸들러 타입 지정 방법을 익힙니다. 실무에서 자주 마주치는 타입 에러를 해결하는 방법과 tsconfig 설정 최적화를 통해 개발 생산성을 높이는 전략을 학습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-03.png',
    userId: 'user3',
    userName: '박지훈',
    category: 1,
    level: '중급',
    studentCount: 18,
    lectureCreatedAt: '2025-10-15T14:30:00Z',
    curriculum: [
      {
        chapterTitle: 'TypeScript 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '기본 타입과 인터페이스',
            lessonMediaUrl: '/media/ts1.mp4',
          },
          {
            lessonId: 'less1-2',
            lessonTitle: '제네릭 이해하기',
            lessonMediaUrl: '/media/ts2.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec4',
    title: 'Node.js와 Express 백엔드',
    description: 'RESTful API 설계부터 배포까지',
    content:
      'Node.js 런타임 환경의 특징과 비동기 프로그래밍 패턴을 이해합니다. Express 프레임워크로 서버를 구축하고, 라우팅, 미들웨어, 에러 핸들링을 구현합니다. MongoDB를 연동하여 CRUD 작업을 처리하고, JWT를 활용한 인증 시스템을 구축합니다. Passport.js로 소셜 로그인을 구현하고, 파일 업로드, 이메일 발송 등 실무 기능을 추가합니다. API 문서화, 테스트 코드 작성, PM2를 이용한 프로세스 관리, Nginx 리버스 프록시 설정까지 배포 전 과정을 다룹니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-05.png',
    userId: 'user4',
    userName: '최유진',
    category: 2,
    level: '중급',
    studentCount: 32,
    lectureCreatedAt: '2025-10-05T11:20:00Z',
    curriculum: [
      {
        chapterTitle: 'Express 시작하기',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '서버 기초와 라우팅',
            lessonMediaUrl: '/media/node1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec5',
    title: 'Flutter 모바일 앱 개발',
    description: '하나의 코드로 iOS와 Android 앱 만들기',
    content:
      'Flutter 프레임워크의 기본 개념과 위젯 시스템을 학습합니다. StatefulWidget과 StatelessWidget의 차이를 이해하고, 레이아웃을 구성하는 방법을 배웁니다. Provider 패턴으로 상태 관리를 구현하고, HTTP 통신으로 REST API와 연동합니다. Firebase를 활용한 푸시 알림, 로컬 데이터베이스 SQLite 연동, 카메라와 갤러리 접근, 지도 API 사용 등 네이티브 기능을 다룹니다. 앱 스토어와 플레이 스토어 배포 준비, 앱 서명, 릴리즈 빌드 생성까지 전 과정을 실습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-02.png',
    userId: 'user5',
    userName: '정민수',
    category: 3,
    level: '초급',
    studentCount: 22,
    lectureCreatedAt: '2025-09-28T08:45:00Z',
    curriculum: [
      {
        chapterTitle: 'Flutter 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '위젯과 레이아웃',
            lessonMediaUrl: '/media/flutter1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec6',
    title: 'ChatGPT API 활용법',
    description: 'AI 챗봇 서비스 구축 완벽 가이드',
    content:
      'OpenAI API를 활용하여 실용적인 AI 애플리케이션을 개발합니다. API 키 발급부터 요청 형식, 응답 처리까지 기본기를 다지고, 프롬프트 엔지니어링 기법으로 원하는 답변을 유도합니다. 스트리밍 응답 처리, 토큰 관리로 비용 최적화, Function Calling으로 외부 도구 연동하는 방법을 배웁니다. 채팅 히스토리 관리, 컨텍스트 윈도우 최적화, RAG 패턴 구현으로 전문 지식을 활용하는 챗봇을 만듭니다. 실시간 채팅 UI 구현과 배포까지 완성합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-07.png',
    userId: 'user6',
    userName: '강다은',
    category: 4,
    level: '중급',
    studentCount: 45,
    lectureCreatedAt: '2025-09-20T16:00:00Z',
    curriculum: [
      {
        chapterTitle: 'OpenAI API 시작',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'API 기본 사용법',
            lessonMediaUrl: '/media/gpt1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec7',
    title: 'Docker 컨테이너 기초',
    description: '개발 환경을 코드로 관리하는 방법',
    content:
      'Docker의 개념과 컨테이너 기술의 장점을 이해합니다. 이미지와 컨테이너의 차이점, Dockerfile 작성법, 레이어 캐싱 최적화를 학습합니다. Docker Compose로 멀티 컨테이너 애플리케이션을 구성하고, 볼륨 마운트로 데이터를 영속화합니다. 네트워크 설정으로 컨테이너 간 통신을 구현하고, 환경 변수 관리, 헬스 체크 설정을 배웁니다. Docker Hub에 이미지를 푸시하고, CI/CD 파이프라인에 통합하는 방법까지 다룹니다. 실무에서 바로 쓸 수 있는 베스트 프랙티스를 학습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-04.png',
    userId: 'user7',
    userName: '한승우',
    category: 5,
    level: '초급',
    studentCount: 28,
    lectureCreatedAt: '2025-09-12T10:15:00Z',
    curriculum: [
      {
        chapterTitle: 'Docker 시작하기',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '컨테이너 기본 개념',
            lessonMediaUrl: '/media/docker1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec8',
    title: 'Python 데이터 분석',
    description: 'Pandas와 Matplotlib으로 데이터 시각화하기',
    content:
      'Python을 활용한 데이터 분석의 전 과정을 학습합니다. Pandas로 CSV, Excel 파일을 읽고 데이터프레임을 조작하는 방법을 배웁니다. 결측치 처리, 중복 제거, 데이터 타입 변환 등 데이터 전처리 기법을 익힙니다. groupby로 집계 분석을 수행하고, merge와 join으로 데이터를 결합합니다. Matplotlib과 Seaborn으로 다양한 차트를 그려 인사이트를 도출합니다. 탐색적 데이터 분석 과정을 실습하고, Jupyter Notebook으로 분석 결과를 문서화하는 방법을 배웁니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-08.png',
    userId: 'user8',
    userName: '송지아',
    category: 6,
    level: '초급',
    studentCount: 35,
    lectureCreatedAt: '2025-09-01T13:30:00Z',
    curriculum: [
      {
        chapterTitle: 'Pandas 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '데이터프레임 다루기',
            lessonMediaUrl: '/media/pandas1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec9',
    title: '머신러닝 입문',
    description: 'scikit-learn으로 시작하는 ML',
    content:
      '머신러닝의 기본 개념과 주요 알고리즘을 학습합니다. 지도학습과 비지도학습의 차이를 이해하고, 선형 회귀, 로지스틱 회귀, 의사결정나무 등 대표 알고리즘을 구현합니다. 훈련 데이터와 테스트 데이터 분리, 교차 검증으로 모델 성능 평가, 하이퍼파라미터 튜닝으로 모델을 최적화합니다. 과적합 방지를 위한 정규화 기법, 특성 엔지니어링으로 모델 성능 향상시키기를 배웁니다. 실제 데이터셋으로 분류와 회귀 문제를 풀어보며 실전 감각을 익힙니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-01.png',
    userId: 'user9',
    userName: '김태현',
    category: 7,
    level: '중급',
    studentCount: 40,
    lectureCreatedAt: '2025-08-25T09:45:00Z',
    curriculum: [
      {
        chapterTitle: 'ML 기초 이론',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '머신러닝 개념 정리',
            lessonMediaUrl: '/media/ml1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec10',
    title: 'Vue 3 Composition API',
    description: '최신 Vue로 반응형 애플리케이션 만들기',
    content:
      'Vue 3의 Composition API를 활용한 컴포넌트 개발을 학습합니다. setup 함수의 동작 원리, ref와 reactive로 반응형 데이터 생성하기, computed와 watch로 데이터 변화 감지하는 방법을 배웁니다. Composable 함수로 로직을 재사용하고, Provide/Inject로 컴포넌트 간 데이터를 공유합니다. Vue Router로 SPA 라우팅을 구현하고, Pinia로 전역 상태를 관리합니다. Vite 빌드 도구로 개발 환경을 구성하고, 컴포넌트 테스트 작성까지 다룹니다. 실무 프로젝트 구조 설계 방법을 익힙니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-06.png',
    userId: 'user10',
    userName: '오하늘',
    category: 1,
    level: '중급',
    studentCount: 19,
    lectureCreatedAt: '2025-08-18T15:20:00Z',
    curriculum: [
      {
        chapterTitle: 'Composition API 시작',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'setup 함수 이해하기',
            lessonMediaUrl: '/media/vue1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec11',
    title: 'Spring Boot REST API',
    description: 'Java 백엔드 개발의 정석',
    content:
      'Spring Boot로 엔터프라이즈급 백엔드 애플리케이션을 개발합니다. Spring MVC 패턴, 의존성 주입, AOP 개념을 이해하고 실습합니다. JPA와 Hibernate로 데이터베이스를 다루고, QueryDSL로 복잡한 쿼리를 작성합니다. Spring Security로 인증과 인가를 구현하고, JWT 토큰 기반 인증 시스템을 구축합니다. 예외 처리 전략, 로깅 설정, 트랜잭션 관리를 배웁니다. Swagger로 API 문서를 자동화하고, JUnit으로 단위 테스트를 작성합니다. 실전 프로젝트로 게시판 API를 완성합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-03.png',
    userId: 'user11',
    userName: '신채원',
    category: 2,
    level: '고급',
    studentCount: 27,
    lectureCreatedAt: '2025-08-10T11:00:00Z',
    curriculum: [
      {
        chapterTitle: 'Spring Boot 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'MVC 패턴과 의존성 주입',
            lessonMediaUrl: '/media/spring1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec12',
    title: 'React Native 앱 개발',
    description: 'React로 네이티브 앱 만들기',
    content:
      'React 지식을 활용하여 모바일 앱을 개발합니다. React Native의 컴포넌트와 API를 학습하고, StyleSheet로 스타일링하는 방법을 배웁니다. Navigation 라이브러리로 화면 전환을 구현하고, AsyncStorage로 로컬 데이터를 저장합니다. 카메라, 위치 정보, 푸시 알림 등 네이티브 기능을 사용합니다. Redux로 상태 관리를 구현하고, API 통신으로 서버와 데이터를 주고받습니다. Expo를 활용한 빠른 개발 환경 구축, 실제 디바이스에서 테스트하기, 앱 스토어 배포 준비 과정을 실습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-05.png',
    userId: 'user12',
    userName: '임준서',
    category: 3,
    level: '중급',
    studentCount: 31,
    lectureCreatedAt: '2025-08-02T14:45:00Z',
    curriculum: [
      {
        chapterTitle: 'RN 시작하기',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'React Native 기본',
            lessonMediaUrl: '/media/rn1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec13',
    title: 'Stable Diffusion 이미지 생성',
    description: 'AI로 원하는 이미지 만들기',
    content:
      'Stable Diffusion을 활용한 AI 이미지 생성 기술을 학습합니다. 모델 설치와 설정, 프롬프트 작성 기법, 네거티브 프롬프트 활용법을 배웁니다. Sampling 방법과 CFG Scale 조정으로 이미지 품질을 제어하고, LoRA 모델을 추가하여 특정 스타일을 구현합니다. ControlNet으로 이미지 구도를 정밀하게 제어하고, Inpainting과 Outpainting으로 이미지를 편집합니다. 배치 생성으로 여러 이미지를 효율적으로 만들고, 고해상도 업스케일링 기법을 적용합니다. 실용적인 프롬프트 예시를 학습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-02.png',
    userId: 'user13',
    userName: '배수민',
    category: 4,
    level: '초급',
    studentCount: 52,
    lectureCreatedAt: '2025-07-28T10:30:00Z',
    curriculum: [
      {
        chapterTitle: 'SD 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '모델 설치와 프롬프트',
            lessonMediaUrl: '/media/sd1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec14',
    title: 'Kubernetes 실전 운영',
    description: '컨테이너 오케스트레이션 마스터하기',
    content:
      'Kubernetes로 컨테이너화된 애플리케이션을 배포하고 관리합니다. Pod, Service, Deployment 등 핵심 오브젝트를 이해하고, YAML 매니페스트 파일을 작성합니다. ConfigMap과 Secret으로 설정을 관리하고, PersistentVolume으로 데이터를 영속화합니다. Ingress로 외부 트래픽을 라우팅하고, HPA로 자동 스케일링을 구현합니다. 헬스 체크 설정, 롤링 업데이트 전략, 모니터링 구축을 배웁니다. Helm 차트로 패키지 관리를 간소화하고, kubectl 명령어로 클러스터를 관리하는 실무 기술을 익힙니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-07.png',
    userId: 'user14',
    userName: '남궁민',
    category: 5,
    level: '고급',
    studentCount: 23,
    lectureCreatedAt: '2025-07-20T16:15:00Z',
    curriculum: [
      {
        chapterTitle: 'K8s 기본 개념',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Pod와 Service',
            lessonMediaUrl: '/media/k8s1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec15',
    title: 'SQL 쿼리 최적화',
    description: '느린 쿼리를 빠르게 만드는 기술',
    content:
      '데이터베이스 성능을 개선하는 SQL 최적화 기법을 학습합니다. 실행 계획 분석으로 쿼리 병목 지점을 찾고, 인덱스 설계 전략으로 조회 속도를 향상시킵니다. Join 최적화, 서브쿼리 제거, 윈도우 함수 활용으로 복잡한 쿼리를 효율적으로 작성합니다. 파티셔닝으로 대용량 테이블을 관리하고, 통계 정보 갱신으로 옵티마이저 성능을 개선합니다. N+1 문제 해결, 커넥션 풀 설정, 트랜잭션 격리 수준 이해를 통해 실무에서 발생하는 성능 이슈를 해결하는 방법을 배웁니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-04.png',
    userId: 'user15',
    userName: '유서진',
    category: 6,
    level: '중급',
    studentCount: 29,
    lectureCreatedAt: '2025-07-12T12:00:00Z',
    curriculum: [
      {
        chapterTitle: '쿼리 성능 분석',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '실행 계획 읽기',
            lessonMediaUrl: '/media/sql1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec16',
    title: '딥러닝 기초',
    description: 'TensorFlow로 신경망 구현하기',
    content:
      '딥러닝의 기본 원리와 신경망 구조를 이해합니다. Perceptron부터 시작하여 다층 신경망, 역전파 알고리즘을 학습합니다. TensorFlow와 Keras로 모델을 구축하고, Dense, Conv2D, LSTM 등 다양한 레이어를 활용합니다. 손실 함수와 옵티마이저 선택, 배치 정규화와 드롭아웃으로 모델 성능을 개선합니다. 이미지 분류, 객체 탐지, 자연어 처리 등 실제 문제를 해결하는 모델을 구현합니다. GPU 활용, 모델 저장과 로딩, 전이 학습 기법으로 효율적으로 학습하는 방법을 익힙니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-08.png',
    userId: 'user16',
    userName: '홍지우',
    category: 7,
    level: '중급',
    studentCount: 38,
    lectureCreatedAt: '2025-07-05T09:20:00Z',
    curriculum: [
      {
        chapterTitle: '신경망 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Perceptron 이해하기',
            lessonMediaUrl: '/media/dl1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec17',
    title: 'Next.js 풀스택 개발',
    description: 'SSR과 SSG로 완성하는 웹 애플리케이션',
    content:
      'Next.js로 서버 사이드 렌더링과 정적 사이트 생성을 활용한 프로젝트를 개발합니다. App Router와 Pages Router의 차이를 이해하고, getServerSideProps와 getStaticProps로 데이터를 불러옵니다. Server Components와 Client Components를 구분하여 최적의 렌더링 전략을 선택합니다. API Routes로 백엔드 기능을 구현하고, Middleware로 요청을 가로채 처리합니다. 이미지 최적화, 폰트 최적화, 메타데이터 관리로 SEO를 개선합니다. Vercel에 배포하고 환경 변수를 관리하는 실무 과정을 학습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-01.png',
    userId: 'user17',
    userName: '문재윤',
    category: 1,
    level: '고급',
    studentCount: 34,
    lectureCreatedAt: '2025-06-28T14:10:00Z',
    curriculum: [
      {
        chapterTitle: 'Next.js 기본',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'SSR과 SSG 이해하기',
            lessonMediaUrl: '/media/next1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec18',
    title: 'GraphQL API 설계',
    description: 'REST를 넘어 효율적인 데이터 통신',
    content:
      'GraphQL의 개념과 REST API와의 차이점을 이해합니다. 스키마 정의 언어로 타입을 선언하고, Query와 Mutation으로 데이터를 조회하고 변경합니다. Resolver 함수를 작성하여 실제 데이터 소스와 연결하고, DataLoader로 N+1 문제를 해결합니다. Apollo Server로 GraphQL 서버를 구축하고, Apollo Client로 프론트엔드에서 데이터를 패치합니다. Subscription으로 실시간 데이터 업데이트를 구현하고, 인증과 인가를 추가합니다. 에러 핸들링, 캐싱 전략, 성능 최적화를 통해 프로덕션 레벨의 API를 완성합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-06.png',
    userId: 'user18',
    userName: '양시우',
    category: 2,
    level: '중급',
    studentCount: 26,
    lectureCreatedAt: '2025-06-20T11:35:00Z',
    curriculum: [
      {
        chapterTitle: 'GraphQL 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '스키마와 리졸버',
            lessonMediaUrl: '/media/gql1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec19',
    title: 'Swift로 iOS 앱 만들기',
    description: '애플 생태계 네이티브 개발',
    content:
      'Swift 언어의 기본 문법과 iOS 앱 개발 프로세스를 학습합니다. UIKit으로 인터페이스를 구성하고, Auto Layout으로 반응형 레이아웃을 만듭니다. SwiftUI로 선언적 UI를 구현하고, Combine으로 반응형 프로그래밍을 적용합니다. Core Data로 로컬 데이터를 저장하고, URLSession으로 네트워크 통신을 처리합니다. 푸시 알림, 위치 서비스, 카메라 접근 등 iOS 고유 기능을 활용합니다. TestFlight로 베타 테스트를 진행하고, App Store에 앱을 제출하는 전체 과정을 실습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-03.png',
    userId: 'user19',
    userName: '서민재',
    category: 3,
    level: '초급',
    studentCount: 21,
    lectureCreatedAt: '2025-06-12T15:50:00Z',
    curriculum: [
      {
        chapterTitle: 'Swift 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Swift 문법 정리',
            lessonMediaUrl: '/media/swift1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec20',
    title: 'LangChain으로 AI 앱 개발',
    description: 'LLM 기반 애플리케이션 구축하기',
    content:
      'LangChain 프레임워크로 LLM 기반 애플리케이션을 개발합니다. 프롬프트 템플릿으로 재사용 가능한 프롬프트를 작성하고, Chain으로 여러 단계를 연결합니다. Vector Store에 문서를 저장하고, Retrieval을 통해 관련 정보를 검색하는 RAG 시스템을 구축합니다. Agent를 활용하여 도구를 선택하고 실행하는 자율적인 시스템을 만듭니다. Memory로 대화 기록을 관리하고, Callback으로 중간 과정을 모니터링합니다. Streamlit으로 간단한 UI를 만들어 실제 서비스 형태로 배포하는 방법을 학습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-05.png',
    userId: 'user20',
    userName: '권예린',
    category: 4,
    level: '고급',
    studentCount: 42,
    lectureCreatedAt: '2025-06-05T10:25:00Z',
    curriculum: [
      {
        chapterTitle: 'LangChain 시작',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Chain과 Agent',
            lessonMediaUrl: '/media/lc1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec21',
    title: 'GitHub Actions CI/CD',
    description: '코드 푸시부터 배포까지 자동화하기',
    content:
      'GitHub Actions로 지속적 통합과 배포 파이프라인을 구축합니다. Workflow 파일 작성법, Job과 Step 구성, 트리거 설정을 배웁니다. 코드 린팅, 테스트 실행, 빌드 자동화를 구현하고, Artifact로 빌드 결과물을 관리합니다. Docker 이미지를 빌드하고 레지스트리에 푸시하는 과정을 자동화합니다. AWS, Azure, GCP 등 클라우드 플랫폼에 자동 배포하는 워크플로우를 만듭니다. 시크릿 관리, 환경별 배포 전략, 승인 프로세스 추가로 안전한 배포 환경을 구성합니다. 실무에서 바로 쓸 수 있는 템플릿을 제공합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-02.png',
    userId: 'user21',
    userName: '조현우',
    category: 5,
    level: '중급',
    studentCount: 30,
    lectureCreatedAt: '2025-05-28T13:40:00Z',
    curriculum: [
      {
        chapterTitle: 'Actions 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Workflow 작성하기',
            lessonMediaUrl: '/media/actions1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec22',
    title: 'ElasticSearch 검색 엔진',
    description: '빠르고 정확한 전문 검색 구현하기',
    content:
      'ElasticSearch로 강력한 검색 기능을 구현합니다. 역인덱스 구조와 분산 시스템 아키텍처를 이해하고, Index와 Document 개념을 학습합니다. Mapping으로 데이터 타입을 정의하고, Analyzer로 텍스트를 분석합니다. Query DSL로 다양한 검색 쿼리를 작성하고, Aggregation으로 데이터를 집계합니다. 자동완성, 오타 허용 검색, 동의어 처리 등 실용적인 기능을 구현합니다. Logstash로 데이터를 수집하고, Kibana로 시각화합니다. 성능 튜닝과 클러스터 관리 방법을 익혀 프로덕션 환경을 운영합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-07.png',
    userId: 'user22',
    userName: '윤도현',
    category: 6,
    level: '고급',
    studentCount: 24,
    lectureCreatedAt: '2025-05-20T09:15:00Z',
    curriculum: [
      {
        chapterTitle: 'ES 기본 개념',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '인덱스와 매핑',
            lessonMediaUrl: '/media/es1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec23',
    title: 'PyTorch 실전 가이드',
    description: '텐서 연산부터 모델 배포까지',
    content:
      'PyTorch로 딥러닝 모델을 개발하고 배포합니다. Tensor 연산과 Autograd로 자동 미분을 이해하고, nn.Module로 커스텀 모델을 정의합니다. DataLoader로 데이터를 효율적으로 로딩하고, Transform으로 데이터를 전처리합니다. CNN으로 이미지 분류, RNN으로 시계열 예측, Transformer로 자연어 처리 모델을 구현합니다. 학습 루프를 작성하고, TensorBoard로 학습 과정을 모니터링합니다. 모델 저장과 로딩, ONNX로 변환, TorchScript로 최적화하여 실전 배포하는 방법을 학습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-04.png',
    userId: 'user23',
    userName: '장수아',
    category: 7,
    level: '고급',
    studentCount: 36,
    lectureCreatedAt: '2025-05-12T14:55:00Z',
    curriculum: [
      {
        chapterTitle: 'PyTorch 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Tensor와 Autograd',
            lessonMediaUrl: '/media/pt1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec24',
    title: 'Svelte 프론트엔드 개발',
    description: '컴파일러 기반의 혁신적인 프레임워크',
    content:
      'Svelte의 독특한 컴파일 방식과 반응형 시스템을 학습합니다. 컴포넌트 작성법, 반응형 선언, 스토어를 활용한 상태 관리를 배웁니다. 조건부 렌더링, 반복문, 이벤트 핸들링으로 동적 UI를 구현합니다. 컴포넌트 간 데이터 전달, 슬롯으로 재사용 가능한 컴포넌트를 만듭니다. SvelteKit으로 라우팅과 SSR을 구현하고, 폼 처리와 API 엔드포인트를 추가합니다. 애니메이션과 트랜지션으로 사용자 경험을 향상시킵니다. Vercel이나 Netlify에 배포하고, 성능 최적화를 통해 완성도를 높입니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-08.png',
    userId: 'user24',
    userName: '임지훈',
    category: 1,
    level: '중급',
    studentCount: 17,
    lectureCreatedAt: '2025-05-05T11:30:00Z',
    curriculum: [
      {
        chapterTitle: 'Svelte 시작',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '반응형 시스템',
            lessonMediaUrl: '/media/svelte1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec25',
    title: 'MongoDB 데이터베이스',
    description: 'NoSQL로 유연한 데이터 관리하기',
    content:
      'MongoDB의 문서 지향 데이터베이스 개념을 이해합니다. Collection과 Document 구조, BSON 데이터 타입을 학습하고, CRUD 연산을 실습합니다. 쿼리 연산자로 복잡한 조건을 표현하고, Aggregation Pipeline으로 데이터를 집계합니다. 인덱스 설계로 조회 성능을 최적화하고, Replica Set으로 고가용성을 확보합니다. Mongoose로 Node.js와 연동하여 스키마를 정의하고 검증합니다. 트랜잭션 처리, 샤딩으로 수평 확장, 백업과 복구 전략을 배웁니다. Atlas 클라우드 서비스 활용법도 다룹니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-01.png',
    userId: 'user25',
    userName: '한유나',
    category: 2,
    level: '초급',
    studentCount: 33,
    lectureCreatedAt: '2025-04-28T16:20:00Z',
    curriculum: [
      {
        chapterTitle: 'MongoDB 기본',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Document와 Collection',
            lessonMediaUrl: '/media/mongo1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec26',
    title: 'Kotlin Android 개발',
    description: '현대적인 언어로 안드로이드 앱 만들기',
    content:
      'Kotlin 언어의 강력한 기능을 활용하여 안드로이드 앱을 개발합니다. Null Safety, 데이터 클래스, 확장 함수 등 Kotlin 문법을 학습합니다. Jetpack Compose로 선언적 UI를 구성하고, ViewModel로 비즈니스 로직을 분리합니다. Room으로 로컬 데이터베이스를 관리하고, Retrofit으로 REST API와 통신합니다. Coroutine으로 비동기 작업을 처리하고, Flow로 반응형 데이터 스트림을 다룹니다. Navigation Component로 화면 전환을 구현하고, Hilt로 의존성 주입을 적용합니다. 구글 플레이 스토어 배포 과정을 학습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-06.png',
    userId: 'user26',
    userName: '백성민',
    category: 3,
    level: '중급',
    studentCount: 28,
    lectureCreatedAt: '2025-04-20T12:45:00Z',
    curriculum: [
      {
        chapterTitle: 'Kotlin 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Kotlin 문법 정리',
            lessonMediaUrl: '/media/kotlin1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec27',
    title: '프롬프트 엔지니어링 실전',
    description: 'AI에게 정확히 원하는 답변 받기',
    content:
      '효과적인 프롬프트 작성 기법을 체계적으로 학습합니다. Few-shot Learning으로 예시를 제공하고, Chain-of-Thought로 단계별 사고를 유도합니다. Role Prompting으로 특정 역할을 부여하고, System Message로 행동 지침을 설정합니다. Temperature와 Top-P 조정으로 출력 결과를 제어하고, 토큰 제한 내에서 최대 효율을 내는 방법을 배웁니다. 다양한 작업별 프롬프트 템플릿을 제공하며, 실제 사례로 번역, 요약, 코드 생성, 창작 글쓰기 등을 실습합니다. 프롬프트 최적화와 평가 방법론을 익힙니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-03.png',
    userId: 'user27',
    userName: '남궁하은',
    category: 4,
    level: '초급',
    studentCount: 48,
    lectureCreatedAt: '2025-04-12T09:00:00Z',
    curriculum: [
      {
        chapterTitle: '프롬프트 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '효과적인 프롬프트 구조',
            lessonMediaUrl: '/media/prompt1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec28',
    title: 'Terraform 인프라 관리',
    description: 'Infrastructure as Code로 인프라 자동화',
    content:
      'Terraform으로 클라우드 인프라를 코드로 관리합니다. HCL 문법을 익히고, Provider 설정으로 AWS, Azure, GCP와 연결합니다. Resource와 Data Source를 정의하고, Variable과 Output으로 재사용 가능한 모듈을 만듭니다. State 파일 관리, 원격 백엔드 설정, State Lock으로 협업 환경을 구축합니다. Workspace로 환경을 분리하고, Module로 인프라 컴포넌트를 추상화합니다. Plan과 Apply 명령으로 변경 사항을 안전하게 적용하고, Import로 기존 리소스를 관리합니다. 실전 예제로 VPC, EC2, RDS 등을 프로비저닝합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-05.png',
    userId: 'user28',
    userName: '독고준혁',
    category: 5,
    level: '고급',
    studentCount: 20,
    lectureCreatedAt: '2025-04-05T15:10:00Z',
    curriculum: [
      {
        chapterTitle: 'Terraform 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'HCL 문법과 리소스',
            lessonMediaUrl: '/media/tf1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec29',
    title: 'Apache Spark 빅데이터',
    description: '대용량 데이터 분산 처리 마스터',
    content:
      'Apache Spark로 대규모 데이터를 효율적으로 처리합니다. RDD, DataFrame, Dataset API를 이해하고 데이터를 변환합니다. Transformation과 Action의 차이를 배우고, Lazy Evaluation으로 성능을 최적화합니다. Spark SQL로 구조화된 데이터를 쿼리하고, DataFrame 연산으로 집계와 조인을 수행합니다. PySpark로 Python 환경에서 작업하고, 파티셔닝과 캐싱으로 성능을 튜닝합니다. Streaming으로 실시간 데이터를 처리하고, MLlib으로 머신러닝 파이프라인을 구축합니다. 클러스터 설정과 작업 제출 방법을 실습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-02.png',
    userId: 'user29',
    userName: '선우지안',
    category: 6,
    level: '고급',
    studentCount: 26,
    lectureCreatedAt: '2025-03-28T10:35:00Z',
    curriculum: [
      {
        chapterTitle: 'Spark 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'RDD와 DataFrame',
            lessonMediaUrl: '/media/spark1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec30',
    title: 'Computer Vision 입문',
    description: '이미지 처리와 객체 인식 기술',
    content:
      'Computer Vision의 핵심 개념과 기술을 학습합니다. OpenCV로 이미지를 읽고 처리하며, 필터링, 에지 검출, 모폴로지 연산을 적용합니다. 색 공간 변환, 히스토그램 분석, 이미지 세그멘테이션을 실습합니다. CNN 기반 이미지 분류 모델을 구현하고, 전이 학습으로 빠르게 학습시킵니다. YOLO와 SSD로 객체 탐지를 수행하고, OpenPose로 포즈 추정을 해봅니다. 얼굴 인식, OCR, 이미지 캡셔닝 등 실용적인 애플리케이션을 만듭니다. 실시간 비디오 처리와 웹캠 연동 방법을 배웁니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-07.png',
    userId: 'user30',
    userName: '황보서율',
    category: 7,
    level: '중급',
    studentCount: 31,
    lectureCreatedAt: '2025-03-20T13:50:00Z',
    curriculum: [
      {
        chapterTitle: 'CV 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'OpenCV 시작하기',
            lessonMediaUrl: '/media/cv1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec31',
    title: 'Angular 프레임워크',
    description: '엔터프라이즈급 SPA 개발',
    content:
      'Angular로 대규모 애플리케이션을 체계적으로 개발합니다. TypeScript 기반의 컴포넌트 구조, 양방향 데이터 바인딩, 의존성 주입을 이해합니다. 서비스로 비즈니스 로직을 분리하고, RxJS로 반응형 프로그래밍을 적용합니다. Routing으로 SPA를 구성하고, Lazy Loading으로 초기 로딩 속도를 개선합니다. Reactive Forms로 복잡한 폼을 다루고, Validators로 유효성 검사를 구현합니다. HttpClient로 API 통신, Interceptor로 요청을 가로채 처리합니다. NgRx로 상태 관리를 체계화하고, 테스트 코드를 작성하여 안정성을 확보합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-04.png',
    userId: 'user31',
    userName: '제갈민서',
    category: 1,
    level: '고급',
    studentCount: 19,
    lectureCreatedAt: '2025-03-12T16:25:00Z',
    curriculum: [
      {
        chapterTitle: 'Angular 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '컴포넌트와 서비스',
            lessonMediaUrl: '/media/angular1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec32',
    title: 'Django 웹 프레임워크',
    description: 'Python으로 빠르게 웹 서비스 구축',
    content:
      'Django의 MTV 패턴과 강력한 ORM을 활용하여 웹 애플리케이션을 개발합니다. Model로 데이터베이스 스키마를 정의하고, Migration으로 변경사항을 관리합니다. View와 Template으로 화면을 구성하고, URLconf로 라우팅을 설정합니다. Django Admin으로 관리자 페이지를 자동 생성하고, 커스터마이징합니다. Form과 ModelForm으로 데이터 입력을 처리하고, Class-Based View로 코드를 재사용합니다. Django REST Framework로 API를 만들고, JWT 인증을 구현합니다. Static 파일 관리, 미디어 파일 업로드, 배포 준비 과정을 학습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-08.png',
    userId: 'user32',
    userName: '사공지원',
    category: 2,
    level: '중급',
    studentCount: 37,
    lectureCreatedAt: '2025-03-05T11:40:00Z',
    curriculum: [
      {
        chapterTitle: 'Django 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'MTV 패턴 이해하기',
            lessonMediaUrl: '/media/django1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec33',
    title: 'Jetpack Compose UI',
    description: '선언적 방식의 안드로이드 UI 개발',
    content:
      'Jetpack Compose로 현대적인 안드로이드 UI를 구축합니다. Composable 함수로 UI를 선언하고, Modifier로 스타일을 적용합니다. State와 Recomposition을 이해하여 반응형 UI를 만들고, remember와 rememberSaveable로 상태를 관리합니다. LazyColumn과 LazyRow로 효율적인 리스트를 구현하고, Animation으로 부드러운 전환 효과를 추가합니다. Navigation Compose로 화면 전환을 처리하고, ViewModel과 통합합니다. Material Design 3 컴포넌트를 활용하여 일관된 디자인을 적용하고, 테마와 다크모드를 구현합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-01.png',
    userId: 'user33',
    userName: '남궁진우',
    category: 3,
    level: '중급',
    studentCount: 25,
    lectureCreatedAt: '2025-02-26T14:15:00Z',
    curriculum: [
      {
        chapterTitle: 'Compose 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Composable 함수',
            lessonMediaUrl: '/media/compose1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec34',
    title: 'RAG 시스템 구축하기',
    description: '검색 증강 생성으로 정확한 AI 답변 만들기',
    content:
      'Retrieval-Augmented Generation 시스템을 구축합니다. 문서를 청크로 분할하고, Embedding 모델로 벡터화하여 Vector DB에 저장합니다. 유사도 검색으로 관련 문서를 찾고, LLM에 컨텍스트로 제공하여 답변을 생성합니다. LangChain으로 RAG 파이프라인을 구성하고, Prompt 최적화로 답변 품질을 개선합니다. Pinecone, ChromaDB, FAISS 등 다양한 벡터 DB를 비교하고, 하이브리드 검색을 구현합니다. 멀티턴 대화 지원, 소스 인용, 스트리밍 응답 등 실용적인 기능을 추가합니다. 평가 메트릭으로 시스템 성능을 측정합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-06.png',
    userId: 'user34',
    userName: '독고준영',
    category: 4,
    level: '고급',
    studentCount: 41,
    lectureCreatedAt: '2025-02-18T09:50:00Z',
    curriculum: [
      {
        chapterTitle: 'RAG 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Vector DB와 Embedding',
            lessonMediaUrl: '/media/rag1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec35',
    title: 'AWS 클라우드 실전',
    description: 'EC2부터 Lambda까지 AWS 서비스 마스터',
    content:
      'AWS의 핵심 서비스를 활용하여 클라우드 인프라를 구축합니다. EC2로 가상 서버를 생성하고, Auto Scaling으로 트래픽에 대응합니다. S3로 정적 파일을 저장하고, CloudFront로 CDN을 구성합니다. RDS로 관계형 데이터베이스를 운영하고, Lambda로 서버리스 함수를 실행합니다. API Gateway로 REST API를 배포하고, IAM으로 권한을 관리합니다. VPC로 네트워크를 설계하고, Route 53으로 도메인을 연결합니다. CloudWatch로 모니터링하고, CloudFormation으로 인프라를 자동화합니다. 비용 최적화 전략도 학습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-03.png',
    userId: 'user35',
    userName: '선우혁준',
    category: 5,
    level: '중급',
    studentCount: 44,
    lectureCreatedAt: '2025-02-10T15:05:00Z',
    curriculum: [
      {
        chapterTitle: 'AWS 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'EC2와 S3',
            lessonMediaUrl: '/media/aws1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec36',
    title: 'Kafka 스트리밍 처리',
    description: '실시간 데이터 파이프라인 구축',
    content:
      'Apache Kafka로 대용량 실시간 데이터를 처리합니다. Topic과 Partition 개념을 이해하고, Producer로 메시지를 발행합니다. Consumer Group으로 병렬 처리를 구현하고, Offset 관리로 메시지 전달을 보장합니다. Kafka Connect로 외부 시스템과 통합하고, Kafka Streams로 스트림 처리 애플리케이션을 개발합니다. Schema Registry로 데이터 형식을 관리하고, KSQL로 SQL 쿼리를 작성합니다. 클러스터 구성, 복제 설정, 성능 튜닝을 배우며, 실시간 로그 수집, 이벤트 기반 아키텍처 구현 등 실전 사례를 다룹니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-05.png',
    userId: 'user36',
    userName: '황보민준',
    category: 6,
    level: '고급',
    studentCount: 22,
    lectureCreatedAt: '2025-02-02T12:30:00Z',
    curriculum: [
      {
        chapterTitle: 'Kafka 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Topic과 Partition',
            lessonMediaUrl: '/media/kafka1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec37',
    title: 'NLP 자연어 처리',
    description: 'Transformer로 텍스트 이해하기',
    content:
      '자연어 처리의 기본 개념과 최신 기술을 학습합니다. 토큰화, 형태소 분석, 불용어 제거 등 전처리 기법을 익힙니다. Word2Vec과 GloVe로 단어 임베딩을 생성하고, TF-IDF로 문서를 벡터화합니다. RNN과 LSTM으로 시퀀스 모델을 구현하고, Attention 메커니즘을 이해합니다. Transformer 아키텍처를 분석하고, BERT로 문장 분류를 수행합니다. Hugging Face Transformers로 사전 학습 모델을 파인튜닝하고, 감성 분석, 개체명 인식, 질의응답 시스템을 구축합니다. GPT 모델로 텍스트 생성도 실습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-02.png',
    userId: 'user37',
    userName: '제갈민준',
    category: 7,
    level: '고급',
    studentCount: 39,
    lectureCreatedAt: '2025-01-25T10:45:00Z',
    curriculum: [
      {
        chapterTitle: 'NLP 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '토큰화와 임베딩',
            lessonMediaUrl: '/media/nlp1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec38',
    title: 'Tailwind CSS 실전',
    description: '유틸리티 클래스로 빠른 스타일링',
    content:
      'Tailwind CSS의 유틸리티 퍼스트 접근 방식을 마스터합니다. 레이아웃, 타이포그래피, 색상, 간격 등 핵심 유틸리티를 학습합니다. Flexbox와 Grid 클래스로 반응형 레이아웃을 구성하고, 미디어 쿼리 없이 반응형 디자인을 구현합니다. 커스텀 설정으로 디자인 시스템을 만들고, @apply로 컴포넌트 클래스를 추출합니다. Dark Mode를 쉽게 적용하고, 플러그인으로 기능을 확장합니다. 프로덕션 빌드 최적화로 파일 크기를 줄이고, JIT 모드로 개발 속도를 높입니다. 실제 프로젝트에 적용하는 베스트 프랙티스를 배웁니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-07.png',
    userId: 'user38',
    userName: '사공윤아',
    category: 1,
    level: '초급',
    studentCount: 46,
    lectureCreatedAt: '2025-01-18T16:00:00Z',
    curriculum: [
      {
        chapterTitle: 'Tailwind 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '유틸리티 클래스 익히기',
            lessonMediaUrl: '/media/tailwind1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec39',
    title: 'FastAPI 고성능 백엔드',
    description: 'Python으로 빠른 API 서버 만들기',
    content:
      'FastAPI로 현대적이고 빠른 API를 개발합니다. Type Hints로 자동 문서화와 검증을 활용하고, Pydantic 모델로 데이터를 정의합니다. Path Parameter와 Query Parameter로 유연한 엔드포인트를 만들고, Request Body로 복잡한 데이터를 받습니다. Dependency Injection으로 코드를 재사용하고, 미들웨어로 요청을 처리합니다. SQLAlchemy로 데이터베이스를 연동하고, Alembic으로 마이그레이션을 관리합니다. JWT 인증을 구현하고, OAuth2 플로우를 적용합니다. 비동기 처리로 성능을 극대화하고, Uvicorn으로 배포합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-04.png',
    userId: 'user39',
    userName: '남궁서준',
    category: 2,
    level: '중급',
    studentCount: 34,
    lectureCreatedAt: '2025-01-10T13:20:00Z',
    curriculum: [
      {
        chapterTitle: 'FastAPI 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Type Hints와 Pydantic',
            lessonMediaUrl: '/media/fastapi1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec40',
    title: 'SwiftUI 인터페이스 디자인',
    description: '선언적 방식으로 iOS UI 만들기',
    content:
      'SwiftUI로 아름다운 iOS 인터페이스를 구축합니다. View 프로토콜과 Body 프로퍼티를 이해하고, Stack으로 레이아웃을 조합합니다. State와 Binding으로 데이터를 관리하고, ObservableObject로 복잡한 상태를 다룹니다. List와 ForEach로 동적 컨텐츠를 표시하고, Navigation으로 화면을 전환합니다. Modifier로 뷰를 커스터마이징하고, Animation으로 부드러운 전환을 만듭니다. Combine으로 반응형 프로그래밍을 적용하고, Async/Await로 비동기 작업을 처리합니다. SF Symbols와 커스텀 Shape으로 디자인을 완성합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-08.png',
    userId: 'user40',
    userName: '독고영서',
    category: 3,
    level: '중급',
    studentCount: 27,
    lectureCreatedAt: '2025-01-02T09:55:00Z',
    curriculum: [
      {
        chapterTitle: 'SwiftUI 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'View와 State',
            lessonMediaUrl: '/media/swiftui1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec41',
    title: 'Fine-tuning LLM 모델',
    description: '나만의 AI 모델 커스터마이징하기',
    content:
      '대규모 언어 모델을 특정 도메인에 맞게 파인튜닝합니다. LoRA와 QLoRA로 효율적인 파라미터 업데이트를 수행하고, PEFT 기법으로 메모리 사용을 최적화합니다. 학습 데이터 준비와 전처리, 프롬프트 형식 설계를 학습합니다. Hugging Face Transformers와 Trainer API로 학습 파이프라인을 구축하고, WandB로 학습 과정을 모니터링합니다. Gradient Accumulation과 Mixed Precision으로 대규모 모델을 효율적으로 학습시킵니다. 모델 평가, 배포 최적화, 추론 가속화 기법을 다루며, 실전 사례로 고객 지원 챗봇을 만듭니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-01.png',
    userId: 'user41',
    userName: '선우정호',
    category: 4,
    level: '고급',
    studentCount: 35,
    lectureCreatedAt: '2024-12-25T14:30:00Z',
    curriculum: [
      {
        chapterTitle: 'Fine-tuning 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'LoRA와 PEFT',
            lessonMediaUrl: '/media/finetune1.mp4',
          },
        ],
      },
    ],
  },
];
