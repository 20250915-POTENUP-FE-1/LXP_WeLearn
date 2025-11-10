export const lecture_list = [
  {
    lectureId: 'lec1',
    title: '웹 접근성과 성능 최적화',
    description: '모두를 위한, 빠른 웹사이트 만들기',
    content:
      '웹 접근성 표준을 준수하고 성능을 극대화하는 프론트엔드 개발 기법을 배웁니다. WCAG 가이드라인 이해, 시맨틱 HTML 작성, ARIA 속성 활용, 키보드 네비게이션 구현을 실습합니다. Lighthouse 점수 개선, Core Web Vitals 최적화, 이미지 lazy loading, 코드 스플리팅 전략을 배우며, 번들 사이즈 분석과 트리 쉐이킹, 캐싱 전략을 통해 로딩 속도를 향상시킵니다. 실무 프로젝트에 바로 적용 가능한 최적화 패턴을 제공합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-01.png',
    userId: 'user1',
    userName: '김민수',
    category: 1,
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
    description: 'useState부터 useReducer까지, 실무에서 바로 쓰는 훅 가이드',
    content:
      'React의 핵심 훅들을 실제 예제와 함께 학습합니다. useState로 상태 관리하기, useEffect로 사이드 이펙트 다루기, useContext로 전역 상태 관리, useReducer로 복잡한 로직 처리, useMemo와 useCallback으로 성능 최적화하는 방법을 배웁니다. 커스텀 훅을 만들어 로직을 재사용하고, 실무에서 자주 마주치는 문제들을 해결하는 패턴을 익힙니다. 프로젝트 구조 설계와 리팩토링 실습을 통해 실무 감각을 향상시킵니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-06.png',
    userId: 'user2',
    userName: '박정복',
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
    title: 'Node.js와 Express 백엔드 개발',
    description: 'REST API 설계부터 배포까지',
    content:
      'Node.js 환경에서 Express 프레임워크를 활용한 백엔드 개발을 처음부터 배웁니다. RESTful API 설계 원칙, 라우팅과 미들웨어 구조, MongoDB와 MySQL 데이터베이스 연동, JWT 기반 인증 시스템 구현을 학습합니다. 에러 핸들링, 로깅, 환경 변수 관리, API 문서화 방법을 익히고, Docker를 활용한 컨테이너화와 AWS EC2 배포까지 실습합니다. 실무에서 바로 적용 가능한 백엔드 아키텍처를 구축합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-02.png',
    userId: 'user3',
    userName: '이서연',
    category: 2,
    level: '초급',
    studentCount: 18,
    lectureCreatedAt: '2025-11-05T14:30:00Z',
    curriculum: [
      {
        chapterTitle: 'Express 기본',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Node.js와 Express 시작하기',
            lessonMediaUrl: '/media/backend1.mp4',
          },
          {
            lessonId: 'less1-2',
            lessonTitle: '라우팅과 미들웨어',
            lessonMediaUrl: '/media/backend2.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec4',
    title: 'Flutter로 크로스플랫폼 앱 만들기',
    description: 'iOS와 Android를 한 번에',
    content:
      'Flutter를 사용하여 하나의 코드로 iOS와 Android 앱을 동시에 개발하는 방법을 배웁니다. Dart 언어 기초, Widget 구조와 상태 관리, Provider와 Riverpod 패턴, HTTP 통신과 JSON 파싱, 로컬 데이터 저장을 학습합니다. Material Design과 Cupertino 디자인 가이드를 따르며, 애니메이션과 제스처 처리, 네이티브 기능 연동, Firebase 통합, 앱 스토어 배포 과정까지 실습합니다. 실제 출시 가능한 수준의 앱을 만듭니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-03.png',
    userId: 'user4',
    userName: '최지훈',
    category: 3,
    level: '중급',
    studentCount: 32,
    lectureCreatedAt: '2025-10-15T11:20:00Z',
    curriculum: [
      {
        chapterTitle: 'Flutter 시작하기',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Dart 언어 기초',
            lessonMediaUrl: '/media/flutter1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec5',
    title: 'ChatGPT API 활용 실전 프로젝트',
    description: 'AI 챗봇부터 자동화 도구까지',
    content:
      'OpenAI의 ChatGPT API를 활용하여 다양한 AI 애플리케이션을 개발합니다. API 키 발급과 요금 체계 이해, 프롬프트 엔지니어링 기법, 컨텍스트 관리와 대화 히스토리 처리, 스트리밍 응답 구현을 배웁니다. 고객 지원 챗봇, 문서 요약 도구, 콘텐츠 생성 자동화, 코드 리뷰 어시스턴트를 만들어보며, RAG 패턴으로 외부 지식 베이스를 연동하고, 함수 호출 기능으로 확장성을 높입니다. 실무 적용 사례를 중심으로 학습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-04.png',
    userId: 'user5',
    userName: '정은지',
    category: 4,
    level: '초급',
    studentCount: 45,
    lectureCreatedAt: '2025-11-08T16:00:00Z',
    curriculum: [
      {
        chapterTitle: 'ChatGPT API 기본',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'API 키 발급과 첫 호출',
            lessonMediaUrl: '/media/gpt1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec6',
    title: 'Kubernetes 실전 운영 가이드',
    description: '컨테이너 오케스트레이션 마스터하기',
    content:
      'Kubernetes를 활용한 컨테이너 오케스트레이션과 배포 자동화를 배웁니다. Pod, Service, Deployment 개념 이해, ConfigMap과 Secret으로 설정 관리, Ingress로 트래픽 라우팅, Persistent Volume으로 데이터 영속성 보장하는 방법을 학습합니다. Helm 차트로 패키지 관리, Prometheus와 Grafana로 모니터링 구축, 로그 수집과 분석, HPA를 통한 자동 스케일링, 롤링 업데이트와 롤백 전략을 실습하며 안정적인 운영 환경을 구축합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-05.png',
    userId: 'user6',
    userName: '강민호',
    category: 5,
    level: '고급',
    studentCount: 15,
    lectureCreatedAt: '2025-10-28T10:15:00Z',
    curriculum: [
      {
        chapterTitle: 'Kubernetes 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Pod와 Service 이해하기',
            lessonMediaUrl: '/media/k8s1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec7',
    title: 'Python 데이터 분석 입문',
    description: 'Pandas와 Matplotlib로 데이터 다루기',
    content:
      'Python을 활용한 데이터 분석의 기초를 탄탄하게 다집니다. NumPy로 배열 연산, Pandas로 데이터 프레임 조작, 데이터 정제와 전처리 기법, 결측치와 이상치 처리, 그룹화와 피벗 테이블 활용을 배웁니다. Matplotlib과 Seaborn으로 시각화 차트 그리기, 통계 분석 기초, CSV와 Excel 파일 읽고 쓰기, 웹 스크래핑으로 데이터 수집까지 실습합니다. 실제 데이터셋을 활용한 프로젝트로 분석 역량을 키웁니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-07.png',
    userId: 'user7',
    userName: '윤서아',
    category: 6,
    level: '초급',
    studentCount: 38,
    lectureCreatedAt: '2025-11-02T13:45:00Z',
    curriculum: [
      {
        chapterTitle: 'Pandas 시작하기',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '데이터프레임 기초',
            lessonMediaUrl: '/media/pandas1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec8',
    title: '딥러닝으로 이미지 분류하기',
    description: 'TensorFlow와 Keras 실습',
    content:
      '딥러닝 기초 개념부터 CNN을 활용한 이미지 분류까지 단계별로 학습합니다. 신경망의 작동 원리, 활성화 함수와 손실 함수, 역전파와 경사 하강법을 이해하고, TensorFlow와 Keras로 모델을 구축합니다. 합성곱 신경망 구조, 데이터 증강 기법, 전이 학습으로 성능 향상, 모델 평가와 튜닝 방법을 배우며, MNIST와 CIFAR-10 데이터셋으로 실습합니다. 실전 프로젝트로 고양이와 개를 분류하는 모델을 만들어봅니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-08.png',
    userId: 'user8',
    userName: '임동현',
    category: 7,
    level: '중급',
    studentCount: 27,
    lectureCreatedAt: '2025-10-25T15:30:00Z',
    curriculum: [
      {
        chapterTitle: '딥러닝 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '신경망의 이해',
            lessonMediaUrl: '/media/dl1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec9',
    title: 'TypeScript로 안전한 코드 작성하기',
    description: '타입 시스템으로 버그 줄이기',
    content:
      'TypeScript의 타입 시스템을 활용하여 안정적인 JavaScript 코드를 작성합니다. 기본 타입과 인터페이스, 제네릭과 유틸리티 타입, 타입 가드와 타입 단언, 클래스와 데코레이터를 학습합니다. tsconfig 설정 최적화, 외부 라이브러리 타입 정의, React와 TypeScript 통합, 에러 처리 패턴, 점진적 마이그레이션 전략을 배우며, 실무 프로젝트에서 TypeScript를 효과적으로 도입하는 방법을 익힙니다. 타입 안정성으로 개발 생산성을 높입니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-01.png',
    userId: 'user9',
    userName: '한지원',
    category: 1,
    level: '중급',
    studentCount: 41,
    lectureCreatedAt: '2025-11-01T09:20:00Z',
    curriculum: [
      {
        chapterTitle: 'TypeScript 기본',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '타입 시스템 이해하기',
            lessonMediaUrl: '/media/ts1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec10',
    title: 'Spring Boot REST API 개발',
    description: '자바 백엔드 완벽 가이드',
    content:
      'Spring Boot로 엔터프라이즈급 REST API를 개발합니다. 스프링 부트 프로젝트 구조, 의존성 주입과 IoC 컨테이너, JPA와 Hibernate ORM 매핑, RESTful 엔드포인트 설계, Spring Security로 인증과 인가 구현을 배웁니다. 트랜잭션 관리, 예외 처리 전략, Swagger로 API 문서화, 테스트 코드 작성, 로깅과 모니터링 설정을 익히고, Docker와 Jenkins로 CI/CD 파이프라인을 구축합니다. 실무에 바로 적용 가능한 아키텍처를 설계합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-02.png',
    userId: 'user10',
    userName: '송민재',
    category: 2,
    level: '중급',
    studentCount: 29,
    lectureCreatedAt: '2025-10-30T11:00:00Z',
    curriculum: [
      {
        chapterTitle: 'Spring Boot 시작',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Spring Boot 프로젝트 생성',
            lessonMediaUrl: '/media/spring1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec11',
    title: 'SwiftUI로 iOS 앱 개발 시작하기',
    description: '선언형 UI로 빠르게 만드는 네이티브 앱',
    content:
      'SwiftUI를 사용하여 현대적인 iOS 앱을 개발합니다. Swift 언어 기초와 옵셔널 처리, View와 Modifier 활용, 상태 관리와 데이터 바인딩, List와 Navigation 구현을 배웁니다. MVVM 아키텍처 패턴, Combine 프레임워크로 반응형 프로그래밍, URLSession으로 네트워크 통신, Core Data로 로컬 저장소 관리, 애니메이션과 제스처 추가 방법을 학습합니다. 실제 앱 스토어에 출시 가능한 퀄리티의 앱을 만들어보며 iOS 개발 역량을 키웁니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-03.png',
    userId: 'user11',
    userName: '배수진',
    category: 3,
    level: '초급',
    studentCount: 22,
    lectureCreatedAt: '2025-11-06T14:10:00Z',
    curriculum: [
      {
        chapterTitle: 'SwiftUI 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'View와 Modifier',
            lessonMediaUrl: '/media/swiftui1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec12',
    title: 'Stable Diffusion 이미지 생성 마스터',
    description: 'AI 아트로 창작의 새로운 지평을',
    content:
      'Stable Diffusion을 활용한 AI 이미지 생성 기술을 마스터합니다. 모델 설치와 환경 설정, 프롬프트 작성 기법과 네거티브 프롬프트 활용, Sampling 메서드와 CFG Scale 조정, LoRA와 ControlNet 활용법을 배웁니다. Img2Img로 이미지 변환, Inpainting으로 부분 수정, Upscaling으로 해상도 향상, 커스텀 모델 파인튜닝 방법을 익히며, 일러스트, 사진, 디자인 등 다양한 스타일의 이미지를 생성합니다. 창작 워크플로우를 최적화합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-04.png',
    userId: 'user12',
    userName: '오성훈',
    category: 4,
    level: '중급',
    studentCount: 52,
    lectureCreatedAt: '2025-10-18T16:40:00Z',
    curriculum: [
      {
        chapterTitle: 'Stable Diffusion 시작',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '설치와 기본 설정',
            lessonMediaUrl: '/media/sd1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec13',
    title: 'Terraform으로 인프라 자동화하기',
    description: 'IaC로 클라우드 리소스 관리',
    content:
      'Terraform을 활용한 Infrastructure as Code를 배우고 클라우드 인프라를 자동화합니다. HCL 문법과 리소스 정의, Provider 설정과 State 관리, Module로 재사용 가능한 구성, Variable과 Output 활용을 학습합니다. AWS, Azure, GCP 리소스 프로비저닝, 워크스페이스로 환경 분리, Remote Backend 구성, 보안 그룹과 네트워크 설정, 테라폼 best practices를 실습합니다. Git과 연동한 GitOps 워크플로우로 협업 효율을 높이고 안정적인 배포를 구현합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-05.png',
    userId: 'user13',
    userName: '신예린',
    category: 5,
    level: '중급',
    studentCount: 19,
    lectureCreatedAt: '2025-10-22T10:30:00Z',
    curriculum: [
      {
        chapterTitle: 'Terraform 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'HCL 문법 배우기',
            lessonMediaUrl: '/media/terraform1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec14',
    title: 'SQL과 데이터베이스 설계 기초',
    description: '관계형 DB 완벽 이해하기',
    content:
      '관계형 데이터베이스의 기초부터 고급 쿼리까지 체계적으로 학습합니다. 테이블 설계와 정규화, 기본 CRUD 쿼리 작성, JOIN으로 테이블 결합, 서브쿼리와 집계 함수, 인덱스 최적화 전략을 배웁니다. 트랜잭션과 ACID 속성, 뷰와 프로시저 활용, 권한 관리와 보안, 백업과 복구 전략, 쿼리 성능 튜닝 방법을 익히며, MySQL과 PostgreSQL 실습으로 실무 감각을 키웁니다. ERD 작성부터 실제 운영까지 데이터베이스 전반을 다룹니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-06.png',
    userId: 'user14',
    userName: '류태양',
    category: 6,
    level: '초급',
    studentCount: 46,
    lectureCreatedAt: '2025-11-03T12:15:00Z',
    curriculum: [
      {
        chapterTitle: 'SQL 기본',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'SELECT와 WHERE 절',
            lessonMediaUrl: '/media/sql1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec15',
    title: 'PyTorch로 시작하는 자연어 처리',
    description: 'BERT부터 GPT까지, NLP 딥러닝',
    content:
      'PyTorch를 활용한 자연어 처리 모델을 구축합니다. 텍스트 전처리와 토큰화, Word Embedding과 Word2Vec, RNN과 LSTM 구조 이해, Attention 메커니즘, Transformer 아키텍처를 배웁니다. BERT로 감성 분석, GPT로 텍스트 생성, 기계 번역 모델 구현, Named Entity Recognition, 텍스트 분류와 요약 작업을 실습합니다. Hugging Face Transformers 라이브러리 활용, 사전 학습 모델 파인튜닝, 실전 프로젝트로 챗봇을 만들어봅니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-07.png',
    userId: 'user15',
    userName: '홍다은',
    category: 7,
    level: '고급',
    studentCount: 23,
    lectureCreatedAt: '2025-10-27T15:50:00Z',
    curriculum: [
      {
        chapterTitle: 'NLP 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '텍스트 전처리',
            lessonMediaUrl: '/media/nlp1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec16',
    title: 'Vue.js 3 Composition API 완벽 가이드',
    description: '반응형 프론트엔드 개발의 정석',
    content:
      'Vue.js 3의 Composition API로 현대적인 프론트엔드 애플리케이션을 개발합니다. setup 함수와 ref, reactive 사용법, computed와 watch 활용, lifecycle hooks 이해, 컴포넌트 간 통신 패턴을 배웁니다. Vue Router로 라우팅 구현, Pinia로 상태 관리, Vite 빌드 도구 설정, TypeScript 통합, 재사용 가능한 composables 작성 방법을 익힙니다. 실전 프로젝트로 Todo 앱과 대시보드를 만들며, Options API에서 마이그레이션하는 전략도 학습합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-08.png',
    userId: 'user16',
    userName: '조현우',
    category: 1,
    level: '중급',
    studentCount: 34,
    lectureCreatedAt: '2025-11-04T13:25:00Z',
    curriculum: [
      {
        chapterTitle: 'Composition API 시작',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'setup과 ref 이해하기',
            lessonMediaUrl: '/media/vue1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec17',
    title: 'Django REST Framework 마스터',
    description: 'Python 백엔드 API 개발 완성',
    content:
      'Django REST Framework로 강력한 RESTful API를 구축합니다. Serializer로 데이터 직렬화, ViewSet과 Router로 엔드포인트 관리, 인증과 권한 시스템 구현, 필터링과 페이지네이션, Throttling으로 rate limit 설정을 배웁니다. JWT 토큰 인증, CORS 설정, 파일 업로드 처리, 테스트 코드 작성, API 문서 자동 생성, Celery로 비동기 작업 처리 방법을 익힙니다. PostgreSQL 연동과 쿼리 최적화, Docker 배포까지 실습하며 프로덕션 레벨의 API를 개발합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-01.png',
    userId: 'user17',
    userName: '서지민',
    category: 2,
    level: '중급',
    studentCount: 28,
    lectureCreatedAt: '2025-10-19T09:45:00Z',
    curriculum: [
      {
        chapterTitle: 'DRF 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Serializer 이해하기',
            lessonMediaUrl: '/media/drf1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec18',
    title: 'React Native로 앱 개발 입문',
    description: '크로스플랫폼 모바일 앱 만들기',
    content:
      'React Native로 iOS와 Android 앱을 동시에 개발하는 방법을 배웁니다. React와의 차이점, 네이티브 컴포넌트 활용, StyleSheet로 스타일링, Navigation 구현, AsyncStorage로 데이터 저장을 학습합니다. REST API 통신, 이미지 처리와 카메라 연동, 푸시 알림 설정, 네이티브 모듈 사용, 앱 빌드와 배포 과정을 실습합니다. Expo CLI와 React Native CLI 비교, 성능 최적화 팁, 디버깅 도구 활용법을 익히며 실제 출시 가능한 앱을 만들어봅니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-02.png',
    userId: 'user18',
    userName: '권민서',
    category: 3,
    level: '초급',
    studentCount: 37,
    lectureCreatedAt: '2025-11-07T14:55:00Z',
    curriculum: [
      {
        chapterTitle: 'React Native 시작',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '개발 환경 설정',
            lessonMediaUrl: '/media/rn1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec19',
    title: 'LangChain으로 AI 에이전트 만들기',
    description: 'LLM 애플리케이션 개발의 모든 것',
    content:
      'LangChain을 활용하여 LLM 기반 애플리케이션을 개발합니다. Chain과 Agent 구조 이해, 프롬프트 템플릿 설계, Memory로 대화 컨텍스트 관리, Tool과 Function Calling 구현을 배웁니다. Vector Store로 문서 검색, RAG 파이프라인 구축, 다중 에이전트 협업 시스템, 스트리밍 응답 처리, 에러 핸들링과 재시도 로직을 학습합니다. OpenAI, Anthropic, Hugging Face 모델 통합, 실전 프로젝트로 Q&A 챗봇과 문서 분석 도구를 만들어봅니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-03.png',
    userId: 'user19',
    userName: '장서윤',
    category: 4,
    level: '중급',
    studentCount: 49,
    lectureCreatedAt: '2025-10-21T11:30:00Z',
    curriculum: [
      {
        chapterTitle: 'LangChain 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Chain과 Agent 이해',
            lessonMediaUrl: '/media/langchain1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec20',
    title: 'GitHub Actions로 CI/CD 구축하기',
    description: '자동화된 배포 파이프라인 만들기',
    content:
      'GitHub Actions로 지속적 통합과 배포를 자동화합니다. Workflow 파일 작성법, Job과 Step 구성, 트리거 이벤트 설정, Secret 관리 방법을 배웁니다. 테스트 자동화, 코드 린팅, 빌드 프로세스, Docker 이미지 생성과 푸시, AWS/Azure/GCP 배포를 실습합니다. Matrix 전략으로 다중 환경 테스트, Caching으로 빌드 속도 향상, 조건부 실행과 재사용 가능한 워크플로우 작성, 배포 승인 프로세스 구축 방법을 익힙니다. DevOps 베스트 프랙티스를 실전에 적용합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-04.png',
    userId: 'user20',
    userName: '정해인',
    category: 5,
    level: '초급',
    studentCount: 31,
    lectureCreatedAt: '2025-11-09T10:20:00Z',
    curriculum: [
      {
        chapterTitle: 'GitHub Actions 시작',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Workflow 파일 작성',
            lessonMediaUrl: '/media/actions1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec21',
    title: 'Apache Spark로 빅데이터 처리하기',
    description: '대규모 데이터 분석 플랫폼 마스터',
    content:
      'Apache Spark를 활용한 대규모 데이터 처리와 분석을 배웁니다. RDD와 DataFrame API, 데이터 변환과 액션 연산, Spark SQL로 쿼리 작성, 파티셔닝과 캐싱 전략을 학습합니다. PySpark로 데이터 ETL 파이프라인 구축, Streaming 데이터 처리, MLlib로 머신러닝 모델 학습, 클러스터 모드 배포, 성능 튜닝과 최적화 기법을 실습합니다. HDFS와 S3 데이터 소스 연동, Parquet 파일 포맷 활용, 실전 프로젝트로 로그 분석과 추천 시스템을 구축합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-05.png',
    userId: 'user21',
    userName: '안유진',
    category: 6,
    level: '고급',
    studentCount: 17,
    lectureCreatedAt: '2025-10-24T16:10:00Z',
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
    lectureId: 'lec22',
    title: '강화학습 기초부터 DQN까지',
    description: 'OpenAI Gym으로 배우는 RL',
    content:
      '강화학습의 기초 개념부터 Deep Q-Network까지 단계별로 학습합니다. MDP와 Bellman 방정식, Q-Learning과 SARSA 알고리즘, Policy Gradient 방법, Actor-Critic 구조를 이해합니다. OpenAI Gym 환경 설정, Cartpole과 Atari 게임 에이전트 학습, Experience Replay와 Target Network, DQN 구현과 학습 안정화 기법을 실습합니다. PyTorch로 신경망 구축, 하이퍼파라미터 튜닝, 성능 시각화와 분석 방법을 배우며, 실전 프로젝트로 게임 AI를 만들어봅니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-06.png',
    userId: 'user22',
    userName: '김도윤',
    category: 7,
    level: '고급',
    studentCount: 20,
    lectureCreatedAt: '2025-10-26T12:40:00Z',
    curriculum: [
      {
        chapterTitle: '강화학습 개념',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'MDP와 Q-Learning',
            lessonMediaUrl: '/media/rl1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec23',
    title: 'Next.js 14 App Router 완벽 가이드',
    description: 'Server Components와 SSR 마스터하기',
    content:
      'Next.js 14의 App Router로 현대적인 풀스택 웹 애플리케이션을 개발합니다. 파일 기반 라우팅, Server Component와 Client Component 구분, Streaming과 Suspense, Server Actions로 폼 처리를 배웁니다. 이미지 최적화, 메타데이터 관리, 동적 라우트와 Catch-all 세그먼트, Parallel Routes와 Intercepting Routes, 미들웨어 활용을 학습합니다. API Routes 작성, ISR과 On-demand Revalidation, Vercel 배포와 성능 최적화, 실전 프로젝트로 블로그와 이커머스 사이트를 만들어봅니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-07.png',
    userId: 'user23',
    userName: '이채원',
    category: 1,
    level: '중급',
    studentCount: 44,
    lectureCreatedAt: '2025-11-01T15:35:00Z',
    curriculum: [
      {
        chapterTitle: 'App Router 시작',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Server Components 이해',
            lessonMediaUrl: '/media/nextjs1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec24',
    title: 'GraphQL API 설계와 구현',
    description: 'Apollo Server로 효율적인 API 만들기',
    content:
      'GraphQL을 활용한 효율적인 API 개발을 배웁니다. Schema 정의와 타입 시스템, Query와 Mutation 작성, Resolver 함수 구현, DataLoader로 N+1 문제 해결을 학습합니다. Apollo Server 설정, Subscriptions로 실시간 데이터, 인증과 권한 처리, 에러 핸들링, GraphQL Playground 사용법을 익힙니다. 프론트엔드에서 Apollo Client 통합, 캐싱 전략, Optimistic UI 구현, 실전 프로젝트로 소셜 미디어 API를 구축하며 REST와의 차이점을 비교합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-08.png',
    userId: 'user24',
    userName: '박시우',
    category: 2,
    level: '중급',
    studentCount: 26,
    lectureCreatedAt: '2025-10-29T13:50:00Z',
    curriculum: [
      {
        chapterTitle: 'GraphQL 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Schema와 Resolver',
            lessonMediaUrl: '/media/graphql1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec25',
    title: 'Kotlin으로 Android 앱 개발하기',
    description: 'Jetpack Compose로 모던 UI 구축',
    content:
      'Kotlin과 Jetpack Compose로 현대적인 Android 앱을 개발합니다. Kotlin 언어 기초와 코루틴, Composable 함수 작성, 상태 관리와 Recomposition, Material Design 3 적용을 배웁니다. Navigation Component로 화면 전환, ViewModel과 LiveData로 MVVM 패턴, Room 데이터베이스 연동, Retrofit으로 네트워크 통신, Coil로 이미지 로딩을 학습합니다. Hilt로 의존성 주입, 테스트 코드 작성, 앱 최적화와 난독화, Play Store 배포까지 실습하며 프로덕션 앱을 완성합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-01.png',
    userId: 'user25',
    userName: '최서연',
    category: 3,
    level: '중급',
    studentCount: 39,
    lectureCreatedAt: '2025-11-05T09:25:00Z',
    curriculum: [
      {
        chapterTitle: 'Kotlin 시작하기',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Kotlin 기본 문법',
            lessonMediaUrl: '/media/kotlin1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec26',
    title: 'Midjourney 프롬프트 엔지니어링',
    description: 'AI 이미지 생성의 예술',
    content:
      'Midjourney로 전문가 수준의 AI 이미지를 생성하는 기법을 마스터합니다. Discord 봇 사용법, 기본 프롬프트 작성과 파라미터 조정, 스타일 키워드와 아티스트 레퍼런스, 종횡비와 품질 설정을 배웁니다. 이미지 프롬프트 활용, Blend 명령어, Remix 모드, Vary와 Upscale 옵션, Niji 모드로 애니메이션 스타일 생성을 학습합니다. 조명과 구도 제어, 색상 팔레트 지정, 실사와 일러스트 스타일 전환, 상업적 활용 사례와 저작권 이슈를 다루며 창작 워크플로우를 구축합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-02.png',
    userId: 'user26',
    userName: '강민재',
    category: 4,
    level: '초급',
    studentCount: 58,
    lectureCreatedAt: '2025-10-23T14:15:00Z',
    curriculum: [
      {
        chapterTitle: 'Midjourney 시작',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Discord 설정과 첫 생성',
            lessonMediaUrl: '/media/mj1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec27',
    title: 'Ansible로 서버 자동화 구축하기',
    description: 'Configuration Management 마스터',
    content:
      'Ansible을 활용한 서버 설정 자동화와 배포를 배웁니다. Inventory 파일 작성, Playbook과 Task 구조, Module 활용법, Variable과 Facts 관리를 학습합니다. Role로 재사용 가능한 구성, Template으로 동적 파일 생성, Handler로 서비스 관리, Vault로 민감 정보 암호화를 실습합니다. 멀티 환경 관리, 조건문과 반복문, 에러 처리와 롤백, Ansible Tower 소개, 실전 프로젝트로 웹 서버와 데이터베이스 클러스터를 자동 구축하며 운영 효율을 높입니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-03.png',
    userId: 'user27',
    userName: '윤지호',
    category: 5,
    level: '중급',
    studentCount: 21,
    lectureCreatedAt: '2025-11-08T11:05:00Z',
    curriculum: [
      {
        chapterTitle: 'Ansible 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Inventory와 Playbook',
            lessonMediaUrl: '/media/ansible1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec28',
    title: 'Tableau로 데이터 시각화 마스터',
    description: '인사이트를 전달하는 대시보드 만들기',
    content:
      'Tableau를 활용한 효과적인 데이터 시각화를 배웁니다. 데이터 연결과 준비, 차트 타입 선택 기준, 계산 필드와 LOD 표현식, 필터와 파라미터 활용을 학습합니다. 대시보드 레이아웃 설계, 액션과 인터랙션 추가, 스토리텔링 기법, 색상과 서식 최적화, Tableau Server/Cloud 배포를 실습합니다. 지도 시각화, 통계 차트, 예측 분석, 실전 프로젝트로 판매 대시보드와 마케팅 리포트를 만들며, 데이터 기반 의사결정을 지원하는 시각화 역량을 키웁니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-04.png',
    userId: 'user28',
    userName: '임수빈',
    category: 6,
    level: '초급',
    studentCount: 43,
    lectureCreatedAt: '2025-10-31T15:40:00Z',
    curriculum: [
      {
        chapterTitle: 'Tableau 시작',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '데이터 연결과 기본 차트',
            lessonMediaUrl: '/media/tableau1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec29',
    title: 'YOLO로 객체 탐지 시스템 구축하기',
    description: '실시간 이미지 인식 마스터',
    content:
      'YOLO 알고리즘을 활용한 실시간 객체 탐지 시스템을 개발합니다. CNN 기초와 객체 탐지 원리, YOLOv8 아키텍처 이해, 커스텀 데이터셋 준비와 라벨링, 모델 학습과 파인튜닝을 배웩니다. Anchor Box와 NMS 개념, mAP 평가 지표, 하이퍼파라미터 최적화, TensorRT로 추론 속도 향상, ONNX 변환과 배포를 학습합니다. 실전 프로젝트로 차량 번호판 인식, 사람 카운팅, 제품 불량 검출 시스템을 구축하며 컴퓨터 비전 실무 역량을 키웁니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-05.png',
    userId: 'user29',
    userName: '한다인',
    category: 7,
    level: '중급',
    studentCount: 30,
    lectureCreatedAt: '2025-11-02T10:55:00Z',
    curriculum: [
      {
        chapterTitle: 'YOLO 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '객체 탐지 개념',
            lessonMediaUrl: '/media/yolo1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec30',
    title: 'Svelte로 가볍고 빠른 웹 앱 만들기',
    description: '컴파일러 기반 프레임워크의 매력',
    content:
      'Svelte를 활용한 고성능 웹 애플리케이션 개발을 배웁니다. 반응형 변수와 $: 구문, 컴포넌트 props와 이벤트, 조건문과 반복문, Transition과 Animation 효과를 학습합니다. Svelte Store로 상태 관리, SvelteKit으로 풀스택 앱 개발, 파일 기반 라우팅, 서버 사이드 렌더링, API 엔드포인트 작성을 실습합니다. 번들 사이즈 최적화, SEO 설정, Adapter로 다양한 플랫폼 배포, 실전 프로젝트로 포트폴리오 사이트와 실시간 채팅 앱을 만들어봅니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-06.png',
    userId: 'user30',
    userName: '서준호',
    category: 1,
    level: '초급',
    studentCount: 24,
    lectureCreatedAt: '2025-11-06T16:20:00Z',
    curriculum: [
      {
        chapterTitle: 'Svelte 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: '반응형 변수와 컴포넌트',
            lessonMediaUrl: '/media/svelte1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec31',
    title: 'Go 언어로 마이크로서비스 개발하기',
    description: '동시성 프로그래밍과 gRPC 마스터',
    content:
      'Go 언어로 확장 가능한 마이크로서비스를 개발합니다. Go 기본 문법과 패키지 관리, Goroutine과 Channel로 동시성 처리, Context로 요청 관리, Error 처리 패턴을 배웁니다. HTTP 서버 구축, gRPC로 서비스 간 통신, Protocol Buffers 정의, 서비스 디스커버리와 로드 밸런싱을 학습합니다. 미들웨어 체인, 로깅과 모니터링, 테스트 작성, Docker와 Kubernetes 배포, 실전 프로젝트로 쇼핑몰 백엔드 시스템을 구축하며 Go의 강점을 활용합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-07.png',
    userId: 'user31',
    userName: '김하늘',
    category: 2,
    level: '중급',
    studentCount: 19,
    lectureCreatedAt: '2025-10-17T12:30:00Z',
    curriculum: [
      {
        chapterTitle: 'Go 언어 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Goroutine과 Channel',
            lessonMediaUrl: '/media/go1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec32',
    title: 'Jetpack Compose 심화 과정',
    description: 'Android UI 개발 완벽 마스터',
    content:
      'Jetpack Compose의 고급 기능과 최적화 기법을 배웁니다. Custom Layout 구현, Canvas로 커스텀 드로잉, Modifier 체인 활용, 제스처 감지와 처리, Animation API 마스터를 학습합니다. CompositionLocal로 의존성 전달, Side Effect 이해와 활용, Recomposition 최적화, LazyColumn 성능 튜닝, 테스트 가능한 UI 작성을 실습합니다. Material 3 테마 커스터마이징, 다크 모드 지원, 접근성 개선, 실전 프로젝트로 복잡한 대시보드와 애니메이션 UI를 만들어봅니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-08.png',
    userId: 'user32',
    userName: '조민지',
    category: 3,
    level: '고급',
    studentCount: 16,
    lectureCreatedAt: '2025-11-04T14:45:00Z',
    curriculum: [
      {
        chapterTitle: 'Advanced Compose',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Custom Layout 만들기',
            lessonMediaUrl: '/media/compose1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec33',
    title: 'Claude API로 챗봇 서비스 만들기',
    description: 'Anthropic AI 활용 완벽 가이드',
    content:
      'Claude API를 활용하여 지능형 챗봇 서비스를 개발합니다. API 키 발급과 인증, Message API 사용법, System Prompt 설계, Multi-turn 대화 관리를 배웁니다. Streaming 응답 처리, Token 사용량 최적화, Safety 필터링, 함수 호출 패턴, 컨텍스트 윈도우 관리를 학습합니다. RAG 시스템 구축, Vector DB 연동, 대화 히스토리 저장, 에러 핸들링과 재시도 로직, 실전 프로젝트로 고객 상담 봇과 문서 Q&A 서비스를 만들며 프로덕션 레벨의 AI 애플리케이션을 완성합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-01.png',
    userId: 'user33',
    userName: '이태현',
    category: 4,
    level: '중급',
    studentCount: 36,
    lectureCreatedAt: '2025-10-20T09:35:00Z',
    curriculum: [
      {
        chapterTitle: 'Claude API 시작',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Message API 기본',
            lessonMediaUrl: '/media/claude1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec34',
    title: 'Prometheus와 Grafana 모니터링',
    description: '시스템 메트릭 수집과 시각화',
    content:
      'Prometheus와 Grafana로 시스템 모니터링 환경을 구축합니다. Prometheus 설치와 설정, PromQL 쿼리 작성, Exporter로 메트릭 수집, Alert Manager로 알림 설정을 배웁니다. Grafana 대시보드 디자인, Panel 타입 선택, Variable과 Template 활용, Alert Rule 구성을 학습합니다. 컨테이너 모니터링, 애플리케이션 메트릭 추가, 로그 수집과 Loki 통합, 성능 병목 지점 발견, 실전 프로젝트로 Kubernetes 클러스터 모니터링 시스템을 구축하며 운영 안정성을 높입니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-02.png',
    userId: 'user34',
    userName: '박지수',
    category: 5,
    level: '중급',
    studentCount: 22,
    lectureCreatedAt: '2025-11-07T13:10:00Z',
    curriculum: [
      {
        chapterTitle: '모니터링 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Prometheus 설치',
            lessonMediaUrl: '/media/prom1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec35',
    title: 'Elasticsearch와 Kibana 활용법',
    description: '대규모 로그 분석 시스템 구축',
    content:
      'Elasticsearch로 대규모 로그 데이터를 저장하고 분석합니다. Index와 Document 개념, Mapping 설정, Query DSL과 Aggregation, Full-text Search 최적화를 배웁니다. Logstash로 데이터 파이프라인 구축, Beats로 로그 수집, Kibana로 시각화 대시보드 생성, Discover와 Canvas 활용을 학습합니다. Ingest Pipeline으로 데이터 변환, ILM으로 인덱스 생애주기 관리, 클러스터 튜닝과 스케일링, 실전 프로젝트로 웹 서버 로그 분석과 보안 이벤트 모니터링 시스템을 구축합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-03.png',
    userId: 'user35',
    userName: '최유진',
    category: 6,
    level: '중급',
    studentCount: 25,
    lectureCreatedAt: '2025-10-19T11:50:00Z',
    curriculum: [
      {
        chapterTitle: 'Elasticsearch 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Index와 Query DSL',
            lessonMediaUrl: '/media/elastic1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec36',
    title: 'GANs로 이미지 생성 모델 만들기',
    description: 'Generative Adversarial Networks 마스터',
    content:
      'GAN 아키텍처로 창의적인 이미지 생성 모델을 개발합니다. Generator와 Discriminator 구조, Adversarial Loss 이해, Mode Collapse 문제와 해결책, Training Stability 향상 기법을 배웁니다. DCGAN 구현과 학습, StyleGAN 아키텍처 이해, Conditional GAN으로 제어 가능한 생성, Pix2Pix로 이미지 변환, CycleGAN으로 도메인 전환을 학습합니다. Latent Space 탐색, FID 평가 지표, 실전 프로젝트로 얼굴 생성과 스타일 전환 모델을 만들며 생성 모델의 핵심을 익힙니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-04.png',
    userId: 'user36',
    userName: '강시온',
    category: 7,
    level: '고급',
    studentCount: 14,
    lectureCreatedAt: '2025-11-09T15:15:00Z',
    curriculum: [
      {
        chapterTitle: 'GAN 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'GAN 아키텍처 이해',
            lessonMediaUrl: '/media/gan1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec37',
    title: 'Astro로 정적 사이트 생성하기',
    description: '초고속 웹사이트 빌드 프레임워크',
    content:
      'Astro를 활용한 최적화된 정적 사이트 생성을 배웁니다. Islands 아키텍처 이해, 컴포넌트 Hydration 전략, 다중 프레임워크 통합, Content Collections 활용을 학습합니다. Markdown과 MDX로 콘텐츠 작성, 동적 라우팅, Image 최적화, View Transitions API, RSS 피드 생성을 실습합니다. Tailwind CSS 통합, SEO 최적화, Cloudflare Pages 배포, 실전 프로젝트로 기술 블로그와 문서 사이트를 만들며 최고 성능의 웹사이트를 구축하는 방법을 익힙니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-05.png',
    userId: 'user37',
    userName: '정민서',
    category: 1,
    level: '초급',
    studentCount: 27,
    lectureCreatedAt: '2025-11-03T10:40:00Z',
    curriculum: [
      {
        chapterTitle: 'Astro 시작하기',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Islands 아키텍처',
            lessonMediaUrl: '/media/astro1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec38',
    title: 'Rust로 시스템 프로그래밍 입문',
    description: '메모리 안전성과 고성능 개발',
    content:
      'Rust 언어로 안전하고 빠른 시스템 프로그램을 개발합니다. Ownership과 Borrowing 개념, Lifetime 이해, Pattern Matching과 Enum, Trait과 Generic, Error Handling을 배웁니다. 동시성 프로그래밍과 Thread Safety, Async/Await 패턴, Cargo 패키지 관리, Unsafe Rust 활용, FFI로 C 라이브러리 연동을 학습합니다. 파일 시스템 조작, 네트워크 프로그래밍, CLI 도구 제작, 실전 프로젝트로 HTTP 서버와 명령줄 유틸리티를 만들며 Rust의 강력함을 체험합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-06.png',
    userId: 'user38',
    userName: '윤재혁',
    category: 2,
    level: '중급',
    studentCount: 18,
    lectureCreatedAt: '2025-10-16T14:20:00Z',
    curriculum: [
      {
        chapterTitle: 'Rust 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Ownership 이해하기',
            lessonMediaUrl: '/media/rust1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec39',
    title: 'Unity로 3D 게임 개발 시작하기',
    description: 'C#과 Unity Engine 완벽 가이드',
    content:
      'Unity 엔진으로 3D 게임을 제작합니다. Unity 인터페이스와 씬 구성, GameObject와 Component 시스템, C# 스크립팅 기초, Rigidbody 물리 엔진을 배웁니다. 캐릭터 이동과 카메라 제어, 충돌 감지와 트리거, UI 시스템과 Canvas, 애니메이션 컨트롤러, 파티클 효과 추가를 학습합니다. 라이팅과 포스트 프로세싱, 사운드 디자인, 빌드와 최적화, 실전 프로젝트로 3인칭 액션 게임을 만들며 게임 개발 전반의 워크플로우를 익히고 플랫폼별 배포까지 경험합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-07.png',
    userId: 'user39',
    userName: '한서윤',
    category: 3,
    level: '초급',
    studentCount: 48,
    lectureCreatedAt: '2025-11-01T16:55:00Z',
    curriculum: [
      {
        chapterTitle: 'Unity 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'GameObject와 Component',
            lessonMediaUrl: '/media/unity1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec40',
    title: 'Hugging Face Transformers 활용법',
    description: '사전 학습 모델로 NLP 프로젝트 만들기',
    content:
      'Hugging Face Transformers 라이브러리로 최신 NLP 모델을 활용합니다. Pre-trained 모델 로드와 사용법, Tokenizer 이해, Pipeline API로 간편한 추론, Fine-tuning 기법을 배웁니다. BERT로 텍스트 분류, GPT로 텍스트 생성, T5로 요약과 번역, 감성 분석과 Named Entity Recognition 구현을 학습합니다. 커스텀 데이터셋 준비, Trainer API로 학습 자동화, 모델 평가와 배포, 실전 프로젝트로 리뷰 분석기와 챗봇을 만들며 NLP 실무 역량을 완성합니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-08.png',
    userId: 'user40',
    userName: '김도현',
    category: 4,
    level: '중급',
    studentCount: 33,
    lectureCreatedAt: '2025-10-25T12:05:00Z',
    curriculum: [
      {
        chapterTitle: 'Transformers 시작',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'Pipeline API 활용',
            lessonMediaUrl: '/media/hf1.mp4',
          },
        ],
      },
    ],
  },
  {
    lectureId: 'lec41',
    title: 'AWS 클라우드 아키텍처 설계',
    description: 'EC2부터 Lambda까지 완벽 가이드',
    content:
      'AWS 클라우드 서비스로 확장 가능한 아키텍처를 설계합니다. EC2 인스턴스 관리, VPC와 서브넷 구성, Security Group 설정, S3로 스토리지 관리를 배웁니다. RDS 데이터베이스 구축, ELB로 로드 밸런싱, Auto Scaling 그룹 설정, CloudFront CDN 활용, Lambda로 서버리스 함수를 학습합니다. IAM 권한 관리, CloudWatch 모니터링, Cost Optimization 전략, 실전 프로젝트로 3-tier 웹 애플리케이션을 배포하며 프로덕션 환경의 인프라를 구축하는 실무 역량을 키웁니다.',
    thumbnailUrl: '/src/assets/images/lxp-image-01.png',
    userId: 'user41',
    userName: '이서영',
    category: 5,
    level: '중급',
    studentCount: 35,
    lectureCreatedAt: '2025-10-21T09:15:00Z',
    curriculum: [
      {
        chapterTitle: 'AWS 기초',
        lessons: [
          {
            lessonId: 'less1-1',
            lessonTitle: 'EC2와 VPC 이해',
            lessonMediaUrl: '/media/aws1.mp4',
          },
        ],
      },
    ],
  },
];
