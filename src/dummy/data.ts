import { Category } from '@/features/home/types/Category'
import { ShortsItem } from '@/features/home/types/shortsItem'
import { PlaylistItem } from '@/features/home/types/playListItem'
import { shorts } from '@/features/home/types/categoryShortsList'

export const shortsItems: ShortsItem[] = [
  {
    id: '1',
    thumbnail: '',
    title: '9:16 :: 10이라는 계산법하는 열리',
    viewCount: '250k',
    duration: '1분',
  },
  {
    id: '2',
    thumbnail: '',
    title: '9:16 :: 펜타르는 줄인이오 소입',
    viewCount: '250k',
    duration: '1분',
  },
  {
    id: '3',
    thumbnail: '',
    title: '그인의 알벡트 모다딘 알하는 갈의',
    viewCount: '250k',
    duration: '1분',
  },
  {
    id: '4',
    thumbnail: '',
    title: '9:16 ≒ 리고 밀켜드 적으로 쁘로 위가 하...',
    viewCount: '250k',
    duration: '1분',
  },
]

//  mock 데이터
export const likeShorts = [
  {
    id: '1',
    category: '프로그래밍',
    thumbnailUrl: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg',
    title: 'Spring Boot 시작하기',
    nickname: '개발자홍길동',
    progress: 75,
  },
  {
    id: '2',
    category: 'UI/UX',

    thumbnailUrl: 'https://images.pexels.com/photos/35008891/pexels-photo-35008891.jpeg',
    title: 'Figma 오토 레이아웃 기초',
    nickname: '디자인펭귄',
    progress: 50,
  },
  {
    id: '3',
    category: '프로그래밍',
    thumbnailUrl: 'https://images.pexels.com/photos/35383162/pexels-photo-35383162.jpeg',
    title: 'React 상태 관리 30초 요약',
    nickname: '프론트선배',
    progress: 100,
  },
  {
    id: '4',
    category: 'UI/UX',
    thumbnailUrl: 'https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg',
    title: 'CSS Grid 1분 이해',
    nickname: 'CSS요정',
    progress: 25,
  },
  {
    id: '5',
    category: '프로그래밍',
    thumbnailUrl: 'https://images.pexels.com/photos/5483075/pexels-photo-5483075.jpeg',
    title: 'DB 인덱스는 왜 필요할까?',
    nickname: '백엔드러버',
    progress: 0,
  },
]

export const savedPlaylists: {
  id: string
  visibility: 'public' | 'private'
  shortsCount: number
  thumbnailUrl: string
  title: string
  category: string
  progress: number
}[] = [
  {
    id: '1',
    visibility: 'private',
    shortsCount: 12,
    thumbnailUrl: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg',
    title: 'Spring Boot 완전 정복',
    category: '프로그래밍',
    progress: 66,
  },
  {
    id: '2',
    visibility: 'public',

    shortsCount: 8,
    thumbnailUrl: 'https://images.pexels.com/photos/35383162/pexels-photo-35383162.jpeg',
    title: 'React 상태 관리 모음',
    category: '프로그래밍',
    progress: 50,
  },
  {
    id: '3',
    visibility: 'public',
    shortsCount: 5,
    thumbnailUrl: 'https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg',
    title: 'CSS 레이아웃 마스터',
    category: 'UI/UX',
    progress: 100,
  },
  {
    id: '4',
    visibility: 'public',
    shortsCount: 15,
    thumbnailUrl: 'https://images.pexels.com/photos/5483075/pexels-photo-5483075.jpeg',
    title: '데이터베이스 기초부터 실전까지',
    category: '프로그래밍',
    progress: 25,
  },
  {
    id: '5',
    visibility: 'public',

    shortsCount: 7,
    thumbnailUrl: 'https://images.pexels.com/photos/270488/pexels-photo-270488.jpeg',
    title: 'Vue vs React 비교 분석',
    category: '프로그래밍',
    progress: 75,
  },
  {
    id: '6',
    visibility: 'public',
    shortsCount: 10,
    thumbnailUrl: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg',
    title: 'REST API 완벽 가이드',
    category: '프로그래밍',
    progress: 50,
  },
  {
    id: '7',
    visibility: 'public',
    shortsCount: 6,
    thumbnailUrl: 'https://images.pexels.com/photos/35008891/pexels-photo-35008891.jpeg',
    title: 'Figma 디자인 시스템',
    category: 'UI/UX',
    progress: 33,
  },
  {
    id: '8',
    visibility: 'public',
    shortsCount: 9,
    thumbnailUrl: 'https://images.pexels.com/photos/35308304/pexels-photo-35308304.jpeg',
    title: '알고리즘 정복하기',
    category: '프로그래밍',
    progress: 66,
  },
]

//  users 데이터
export const user = {
  name: '김코딩',
  email: 'test@test.com',
  profileImageUrl: 'https://images.pexels.com/photos/35308304/pexels-photo-35308304.jpeg',
}

export const playlistGroup: PlaylistItem[] = [
  {
    id: '1',
    shortsCount: 12,
    thumbnailUrl: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg',
    title: 'Spring Boot 완전 정복',
    category: '프로그래밍',
    progress: 66,
    viewCount: 120,
    likeCount: 48,
  },

  {
    id: '3',
    shortsCount: 5,
    thumbnailUrl: 'https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg',
    title: 'CSS 레이아웃 마스터',
    category: 'UI/UX',
    progress: 100,
    viewCount: 95,
    likeCount: 37,
  },
  {
    id: '4',
    shortsCount: 15,
    thumbnailUrl: 'https://images.pexels.com/photos/5483075/pexels-photo-5483075.jpeg',
    title: '데이터베이스 기초부터 실전까지',
    category: '프로그래밍',
    progress: 25,
    viewCount: 140,
    likeCount: 52,
  },
  {
    id: '5',
    shortsCount: 7,
    thumbnailUrl: 'https://images.pexels.com/photos/270488/pexels-photo-270488.jpeg',
    title: 'Vue vs React 비교 분석',
    category: '프로그래밍',
    progress: 75,
    viewCount: 110,
    likeCount: 44,
  },
]

export const categories: Category[] = ['전체', '개발', '디자인', '비즈니스']

export const categoryShortsList: shorts[] = [
  {
    id: '1',
    title: '프론트엔드 빌드 과정 완전 분석',
    nickname: '오노석',
    category: '개발',
    categoryColor: 'bg-blue-500',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    price: '₩39,000',
    likeCount: 48,
    studentCount: '1,200명',
    viewCount: 120,
    description:
      'This comprehensive course covers the entire frontend build process from start to finish. You will learn how modern bundlers like Webpack and Vite work under the hood, understand the role of transpilers like Babel, and master optimization techniques for production builds. We explore code splitting, tree shaking, and asset optimization strategies that will significantly improve your application performance.',
  },
  {
    id: '2',
    title: 'Next.js와 Firebase로 실시간 채팅 구현',
    nickname: '전남',
    category: '개발',
    categoryColor: 'bg-blue-600',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=225&fit=crop',
    price: '₩49,000',
    likeCount: 47,
    studentCount: '2,030명',
    viewCount: 180,
    description:
      'Build a fully functional real-time chat application using Next.js and Firebase. This course teaches you how to set up Firebase Realtime Database and Firestore for instant message synchronization, implement user authentication with Firebase Auth, and create responsive chat interfaces. You will also learn best practices for handling online presence, typing indicators, and message read receipts.',
  },
  {
    id: '3',
    title: 'REST API와 GraphQL 완전 비교',
    nickname: '황민지',
    category: '비즈니스',
    categoryColor: 'bg-green-600',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
    price: '₩32,000',
    likeCount: 46,
    studentCount: '980명',
    viewCount: 92,
    description:
      'A detailed comparison between REST API and GraphQL architectures. This course helps you understand when to use each approach based on your project requirements. We cover the fundamental differences in data fetching, caching strategies, and developer experience. Learn how to design efficient APIs, handle versioning, and implement authentication for both paradigms with real-world examples.',
  },
  {
    id: '4',
    title: 'iOS · Android 앱 개발 입문',
    nickname: '김요재',
    category: '디자인',
    categoryColor: 'bg-orange-500',
    thumbnail: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400&h=225&fit=crop',
    price: '₩45,000',
    likeCount: 48,
    studentCount: '1,530명',
    viewCount: 143,
    description:
      'Start your mobile development journey with this beginner-friendly course covering both iOS and Android platforms. Learn the fundamentals of mobile UI/UX design, understand platform-specific guidelines, and build your first native applications. We cover Swift basics for iOS development and Kotlin essentials for Android, giving you a solid foundation to pursue either platform.',
  },
  {
    id: '5',
    title: 'JavaScript 비동기 프로그래밍 완전 이해',
    nickname: '도도',
    category: '개발',
    categoryColor: 'bg-yellow-500',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
    price: '₩29,000',
    likeCount: 45,
    studentCount: '2,830명',
    viewCount: 201,
    description:
      'Master asynchronous JavaScript programming from callbacks to modern async/await syntax. This course demystifies the event loop, explains how Promises work internally, and teaches you to write clean, maintainable asynchronous code. You will learn error handling patterns, parallel execution strategies, and how to avoid common pitfalls like callback hell and race conditions.',
  },
  {
    id: '6',
    title: 'Supabase Functions로 서버 자동화 구축',
    nickname: '노용',
    category: '개발',
    categoryColor: 'bg-purple-500',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=225&fit=crop',
    price: '₩55,000',
    likeCount: 49,
    studentCount: '720명',
    viewCount: 67,
    description:
      'Learn to build powerful serverless backends using Supabase Edge Functions. This course covers everything from setting up your first function to deploying production-ready APIs. We explore database triggers, scheduled tasks, and webhook integrations. You will also learn how to handle authentication, implement row-level security, and optimize function performance for scale.',
  },
  {
    id: '7',
    title: '웹소켓으로 실시간 채팅 구현 마스터',
    nickname: '전남',
    category: '개발',
    categoryColor: 'bg-teal-600',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
    price: '₩47,000',
    likeCount: 47,
    studentCount: '1,140명',
    viewCount: 115,
    description:
      'Deep dive into WebSocket technology and build professional-grade real-time applications. This course teaches you the WebSocket protocol fundamentals, connection management, and message handling patterns. Learn to implement features like room-based chat, private messaging, and broadcast notifications. We also cover scaling strategies using Redis pub/sub and handling reconnection gracefully.',
  },
  {
    id: '8',
    title: 'Next.js SEO 최적화와 Sitemap 생성 방법',
    nickname: '전남',
    category: '디자인',
    categoryColor: 'bg-indigo-600',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=225&fit=crop',
    price: '₩21,000',
    likeCount: 46,
    studentCount: '690명',
    viewCount: 54,
    description:
      'Optimize your Next.js applications for search engines with proven SEO strategies. This course covers metadata management, dynamic sitemap generation, and structured data implementation. Learn how to leverage Next.js features like static generation and incremental static regeneration for better crawlability. We also explore performance optimization techniques that directly impact your search rankings.',
  },
  {
    id: '9',
    title: '데이터 분석을 위한 Python 기초',
    nickname: '송하린',
    category: '비즈니스',
    categoryColor: 'bg-green-500',
    thumbnail: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=400&h=225&fit=crop',
    price: '₩33,000',
    likeCount: 45,
    studentCount: '3,200명',
    viewCount: 177,
    description:
      'Begin your data analysis journey with Python fundamentals designed for aspiring data scientists. This course introduces essential libraries like Pandas, NumPy, and Matplotlib for data manipulation and visualization. You will learn to clean messy datasets, perform statistical analysis, and create compelling visualizations. Perfect for business professionals looking to make data-driven decisions.',
  },
  {
    id: '10',
    title: 'SQL 완전 정복: 기초부터 실무까지',
    nickname: '이태오',
    category: '비즈니스',
    categoryColor: 'bg-blue-400',
    thumbnail: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=400&h=225&fit=crop',
    price: '₩40,000',
    likeCount: 47,
    studentCount: '1,870명',
    viewCount: 134,
    description:
      'Master SQL from basic queries to advanced database operations used in production environments. This comprehensive course covers SELECT statements, JOINs, subqueries, and window functions. Learn database design principles, indexing strategies, and query optimization techniques. We use real-world datasets and scenarios to prepare you for actual business challenges you will face.',
  },
  {
    id: '11',
    title: '머신러닝 기초부터 실전 모델링까지',
    nickname: '오노석',
    category: '비즈니스',
    categoryColor: 'bg-purple-600',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    price: '₩59,000',
    likeCount: 48,
    studentCount: '1,430명',
    viewCount: 139,
    description:
      'A practical introduction to machine learning that takes you from theory to deployment. This course covers supervised and unsupervised learning algorithms, feature engineering, and model evaluation techniques. You will build classification and regression models using scikit-learn, understand the bias-variance tradeoff, and learn best practices for model selection and hyperparameter tuning.',
  },
  {
    id: '12',
    title: 'React 디자인 패턴 완벽 가이드',
    nickname: '전남',
    category: '디자인',
    categoryColor: 'bg-blue-500',
    thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=225&fit=crop',
    price: '₩44,000',
    likeCount: 47,
    studentCount: '2,200명',
    viewCount: 154,
    description:
      'Elevate your React development skills with proven design patterns used by top engineering teams. This course covers compound components, render props, custom hooks, and the provider pattern. Learn to build flexible, reusable component libraries and manage complex state effectively. We explore real-world refactoring scenarios and discuss trade-offs between different architectural approaches.',
  },
  {
    id: '13',
    title: 'AI 시대를 대비한 백엔드 아키텍처',
    nickname: '황민지',
    category: '개발',
    categoryColor: 'bg-red-500',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
    price: '₩58,000',
    likeCount: 49,
    studentCount: '980명',
    viewCount: 88,
    description:
      'Prepare your backend systems for the AI revolution with modern architectural patterns. This course covers designing APIs for ML model integration, handling high-throughput inference requests, and implementing efficient data pipelines. Learn about vector databases, embedding services, and caching strategies for AI workloads. We also discuss cost optimization and scaling considerations for AI-powered applications.',
  },
  {
    id: '14',
    title: 'Flutter로 크로스 플랫폼 앱 만들기',
    nickname: '김요재',
    category: '디자인',
    categoryColor: 'bg-yellow-600',
    thumbnail: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=400&h=225&fit=crop',
    price: '₩36,000',
    likeCount: 46,
    studentCount: '1,400명',
    viewCount: 76,
    description:
      'Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase using Flutter. This course covers Dart programming fundamentals, widget composition, and state management solutions like Provider and Riverpod. Learn to implement platform-specific features, handle navigation, and integrate with native APIs. Deploy your apps to both app stores confidently.',
  },
  {
    id: '15',
    title: 'DevOps 파이프라인 구축과 자동화',
    nickname: '도도',
    category: '디자인',
    categoryColor: 'bg-teal-600',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=225&fit=crop',
    price: '₩62,000',
    likeCount: 48,
    studentCount: '1,120명',
    viewCount: 133,
    description:
      'Transform your development workflow with modern DevOps practices and automation. This course teaches you to build CI/CD pipelines using GitHub Actions and GitLab CI, implement infrastructure as code with Terraform, and manage containerized applications with Docker and Kubernetes. Learn monitoring and alerting strategies, incident response procedures, and continuous improvement methodologies.',
  },
  {
    id: '16',
    title: 'Supabase Functions 실전 사용법',
    nickname: '노용',
    category: '개발',
    categoryColor: 'bg-pink-500',
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=225&fit=crop',
    price: '₩41,000',
    likeCount: 47,
    studentCount: '760명',
    viewCount: 52,
    description:
      'Take your Supabase skills to the next level with advanced Edge Functions techniques. This hands-on course covers complex use cases like payment processing, email automation, and third-party API integrations. Learn to write type-safe functions with TypeScript, implement proper error handling, and set up comprehensive logging. We also explore testing strategies and deployment best practices.',
  },
  {
    id: '17',
    title: '웹소켓 실시간 채팅 시스템 구축',
    nickname: '전남',
    category: '개발',
    categoryColor: 'bg-blue-700',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=225&fit=crop',
    price: '₩38,000',
    likeCount: 48,
    studentCount: '1,050명',
    viewCount: 110,
    description:
      'Build a production-ready real-time chat system from scratch using WebSocket technology. This project-based course guides you through designing chat architecture, implementing message persistence, and handling user presence. Learn to build features like typing indicators, message reactions, and file sharing. We cover security considerations, rate limiting, and strategies for handling thousands of concurrent connections.',
  },
  {
    id: '18',
    title: 'Next.js SEO 자동화 완벽 가이드',
    nickname: '전남',
    category: '개발',
    categoryColor: 'bg-indigo-600',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=225&fit=crop',
    price: '₩27,000',
    likeCount: 47,
    studentCount: '880명',
    viewCount: 73,
    description:
      'Automate your SEO workflow in Next.js applications for maximum organic traffic. This course teaches you to programmatically generate meta tags, create dynamic Open Graph images, and build intelligent internal linking systems. Learn to integrate with Google Search Console API for performance monitoring and implement automated content optimization. Perfect for developers managing large-scale content websites.',
  },
]
