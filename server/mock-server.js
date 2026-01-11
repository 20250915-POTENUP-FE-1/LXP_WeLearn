const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('server/db.json')
const middlewares = jsonServer.defaults()

// 미들웨어 및 BodyParser 설정
server.use(middlewares)
server.use(jsonServer.bodyParser)

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000') // 프론트 주소
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  next()
})

// ==========================================
// 1. 로그인 (POST /api/auth/login)
// ==========================================
server.post('/api/v1/auth/login', (req, res) => {
  const { email, password } = req.body
  const db = router.db // db.json 접근

  // 유저 찾기
  const user = db.get('users').find({ email, password }).value()

  if (user) {
    // 비밀번호는 보안상 응답에서 제외
    const { password, ...userInfo } = user

    const accessToken = 'fake_access_token_' + Date.now()
    const refreshToken = 'fake_refresh_token_' + Date.now()

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'Strict',
      path: '/',
      maxAge: 86400 * 1000, // ms 단위
    })

    const cookieHeaderValue = res.get('Set-Cookie')
    console.log('설정된 Set-Cookie 헤더 값:', cookieHeaderValue)

    return res.status(200).json({
      accessToken: accessToken,
      user: userInfo,
      message: '로그인 성공',
    })
  } else {
    return res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' })
  }
})

// ==========================================
// 2. 인증 가드 (Authorization 헤더 체크)
// ==========================================
server.use((req, res, next) => {
  // 인증이 필요 없는 공개 경로들
  const publicPaths = ['/api/v1/auth/login', '/api/v1/auth/signup', '/api/v1/auth/logout']

  // GET 요청(조회)은 게시글 목록 같은 경우 공개일 수 있으므로 일단 통과
  // (단, /users/me 같은 개인정보는 아래에서 별도 처리)
  if (req.method === 'GET' && !req.path.startsWith('/api/users/me')) {
    return next()
  }

  // 공개 경로가 아니면 토큰 검사
  if (!publicPaths.includes(req.path)) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '로그인이 필요합니다 (토큰 없음).' })
    }
  }

  next()
})

// ==========================================
// 3. 내 정보 조회 (GET /api/users/me)
// ==========================================
server.get('/api/v1/users/me', (req, res) => {
  // 실제론 토큰을 해독해야 하지만, Mock이므로 무조건 1번 유저(홍길동)라고 가정
  const userId = 1
  const db = router.db
  const user = db.get('users').find({ id: userId }).value()

  if (user) {
    const { password, ...userInfo } = user
    res.json(userInfo)
  } else {
    res.status(404).json({ message: '유저를 찾을 수 없습니다.' })
  }
})

// ==========================================
// 4. 게시글 작성 (POST /api/posts)
// ==========================================
server.post('/api/v1/posts', (req, res, next) => {
  // 백엔드에서 해줘야 할 일 (클라이언트가 보내지 않는 데이터 주입)
  // 실제라면 토큰을 디코딩해서 userId를 뽑지만,
  // 여기선 테스트를 위해 무조건 id:1 (홍길동)이 쓴 것으로 간주합니다.
  // (다른 유저로 테스트하고 싶으면 이 값을 바꾸세요)
  const currentUserId = 1
  req.body.userId = currentUserId
  req.body.author = '홍길동'
  req.body.createdAt = new Date().toISOString()

  // id는 json-server가 자동 생성하므로 패스하고 저장 로직으로 이동
  next()
})

// ==========================================
// 5. 게시글 수정/삭제 권한 체크 (PUT/DELETE)
// ==========================================
server.use('/api/v1/posts/:id', (req, res, next) => {
  if (req.method === 'GET') return next()

  const postId = parseInt(req.params.id)
  const db = router.db
  const post = db.get('posts').find({ id: postId }).value()

  if (!post) {
    return res.status(404).json({ message: '게시글이 없습니다.' })
  }

  // 작성자 본인 확인 (현재 로그인 유저는 무조건 id:1 홍길동이라고 가정)
  const currentUserId = 1

  if (post.userId !== currentUserId) {
    return res.status(403).json({ message: '본인의 게시글만 수정/삭제할 수 있습니다.' })
  }

  req.body.userId = post.userId
  req.body.author = post.author
  req.body.createdAt = post.createdAt

  next() // 권한 통과 시 json-server 로직 실행
})

// ==========================================
// 6. 회원가입 (POST /api/auth/register)
// ==========================================
server.post('/api/v1/auth/signup', (req, res) => {
  const { email, password, name, nickname, profileUrl } = req.body

  if (!email || !password || !name || !nickname) {
    return res.status(400).json({
      message: 'email, password, name 은 필수입니다.',
    })
  }

  const db = router.db

  // 이메일 중복 체크
  const exists = db.get('users').find({ email }).value()

  if (exists) {
    return res.status(409).json({
      success: false,
      message: '이미 존재하는 이메일입니다.',
    })
  }

  // 새 유저 생성 (json-server가 id 자동 생성 X → 우리가 직접 넣어야 함)
  const newUser = {
    id: Date.now(),
    email,
    password, // 실제 서비스라면 hash 해야 하지만 mock이니까 plain text ok
    name,
    nickname,
    createdAt: new Date().toISOString(),
  }

  db.get('users').push(newUser).write()

  // 비밀번호 제외하고 반환
  const { password: _, ...userInfo } = newUser

  return res.status(201).json({
    message: '회원가입 성공',
    user: userInfo,
    success: true,
  })
})

server.post('/api/v1/auth/logout', (req, res) => {
  return res.status(200).json({ message: '로그아웃 성공' })
})
// ==========================================
// 7. 댓글
// ==========================================
// POST 댓글 등록
server.post('/api/v1/posts/:postId/comments', (req, res) => {
  const db = router.db
  const postId = parseInt(req.params.postId)

  const { content, parentId = null } = req.body

  if (!content) {
    return res.status(400).json({ message: '댓글 내용이 필요합니다.' })
  }

  const currentUserId = 1

  const newComment = {
    id: Date.now(),
    postId,
    userId: currentUserId,
    content,
    parentId,
    createdAt: new Date().toISOString(),
  }

  db.get('comments').push(newComment).write()

  return res.status(201).json(newComment)
})

// GET 댓글 조회
server.get('/api/v1/shorts/:shortsId/comments', (req, res) => {
  const db = router.db
  const shortsId = parseInt(req.params.shortsId, 10)

  const comments = db.get('comments').filter({ shortsId }).sortBy('createdAt').value()

  const map = {}
  const roots = []

  comments.forEach((c) => {
    map[c.id] = {
      id: c.id,
      content: c.content,
      createdAt: c.createdAt,
      user: c.user,
      replies: [],
    }
  })

  comments.forEach((c) => {
    if (c.parentId) {
      map[c.parentId]?.replies.push(map[c.id])
    } else {
      roots.push(map[c.id])
    }
  })

  res.json({
    totalCount: roots.length,
    comments: roots,
  })
})

// PUT 댓글 수정
server.put('/api/v1/comments/:id', (req, res) => {
  const db = router.db
  const commentId = parseInt(req.params.id)
  const { content } = req.body

  if (!content) {
    return res.status(400).json({ message: '댓글 내용이 필요합니다.' })
  }

  const comment = db.get('comments').find({ id: commentId }).value()

  if (!comment) {
    return res.status(404).json({ message: '댓글이 없습니다.' })
  }

  const currentUserId = 1

  if (comment.userId !== currentUserId) {
    return res.status(403).json({ message: '본인 댓글만 수정할 수 있습니다.' })
  }

  db.get('comments').find({ id: commentId }).assign({ content }).write()

  res.json({ message: '댓글 수정 성공' })
})

// delete 댓글 삭제
server.delete('/api/v1/comments/:id', (req, res) => {
  const db = router.db
  const commentId = parseInt(req.params.id)

  const comment = db.get('comments').find({ id: commentId }).value()

  if (!comment) {
    return res.status(404).json({ message: '댓글이 없습니다.' })
  }

  const currentUserId = 1

  if (comment.userId !== currentUserId) {
    return res.status(403).json({ message: '본인 댓글만 삭제할 수 있습니다.' })
  }

  // 대댓글도 함께 삭제
  db.get('comments')
    .remove((c) => c.id === commentId || c.parentId === commentId)
    .write()

  res.json({ message: '댓글 삭제 성공' })
})

// ==========================================
// 8. 내 숏츠 목록 조회 (GET /api/v1/users/me/shorts)
// ==========================================
server.get('/api/v1/users/me/shorts', (req, res) => {
  const db = router.db
  const { page = 0, size = 20 } = req.query

  // 전체 숏츠 목록 (Mock에서는 전체 반환)
  const allShorts = db.get('shorts').value()

  // 페이지네이션 처리
  const pageNum = parseInt(page)
  const sizeNum = parseInt(size)
  const startIndex = pageNum * sizeNum
  const endIndex = startIndex + sizeNum
  const paginatedShorts = allShorts.slice(startIndex, endIndex)

  // API 스키마에 맞게 응답 형식 조정
  const content = paginatedShorts.map((shorts) => ({
    shortsId: shorts.shortsId,
    title: shorts.title,
    description: shorts.description,
    videoUrl: shorts.videoUrl,
    thumbnailUrl: shorts.thumbnailUrl,
    uploader: shorts.uploader,
    category: shorts.category,
    keywords: shorts.keywords || [],
    status: shorts.status || 'PUBLISHED',
    durationSec: shorts.durationSec || 60,
  }))

  const totalElements = allShorts.length
  const totalPages = Math.ceil(totalElements / sizeNum)

  const response = {
    content,
    totalElements,
    totalPages,
    size: sizeNum,
    number: pageNum,
    first: pageNum === 0,
    last: pageNum >= totalPages - 1,
    numberOfElements: content.length,
    empty: content.length === 0,
  }

  res.json(response)
})

// ==========================================
// 8-1. 숏츠 상세 조회 (GET /api/v1/shorts/:id)
// ==========================================
server.get('/api/v1/shorts/:id', (req, res) => {
  const db = router.db
  const shortsId = parseInt(req.params.id)

  const shorts = db.get('shorts').find({ shortsId: shortsId }).value()

  if (!shorts) {
    return res.status(404).json({ message: '숏츠를 찾을 수 없습니다.' })
  }

  // 실제 API 스키마에 맞게 페이지네이션 응답 구조로 반환
  const response = {
    success: true,
    message: '숏츠 조회 성공',
    data: {
      content: [
        {
          shortsId: shorts.shortsId,
          title: shorts.title,
          description: shorts.description,
          videoUrl: shorts.videoUrl,
          thumbnailUrl: shorts.thumbnailUrl,
          uploader: shorts.uploader,
          category: shorts.category,
          keywords: shorts.keywords || [],
          status: shorts.status || 'PUBLISHED',
          durationSec: shorts.durationSec || 60,
        },
      ],
      totalElements: 1,
      totalPages: 1,
      size: 1,
      number: 0,
      first: true,
      last: true,
      numberOfElements: 1,
      empty: false,
    },
  }

  res.json(response)
})

// ==========================================
// 8-2. 숏츠 수정 (PATCH /api/v1/shorts/:id)
// ==========================================
server.patch('/api/v1/shorts/:id', (req, res) => {
  const db = router.db
  const shortsId = parseInt(req.params.id)

  const shorts = db.get('shorts').find({ shortsId: shortsId }).value()

  if (!shorts) {
    return res.status(404).json({
      success: false,
      message: '숏츠를 찾을 수 없습니다.'
    })
  }

  // 업데이트할 데이터 추출
  const { title, description, categoryId, status, keywords, thumbnailUrl } = req.body

  // 카테고리 정보 업데이트 (categoryId가 제공된 경우)
  // 카테고리 매핑 (DUMMY_CATEGORIES와 일치)
  const categoryMap = {
    1: { categoryId: 1, name: '프론트엔드' },
    2: { categoryId: 2, name: '백엔드' },
    3: { categoryId: 3, name: '디자인' },
    4: { categoryId: 4, name: '데이터' },
    5: { categoryId: 5, name: 'DevOps' },
    6: { categoryId: 6, name: '모바일' },
  }
  let category = shorts.category
  if (categoryId) {
    const parsedCategoryId = parseInt(categoryId)
    if (categoryMap[parsedCategoryId]) {
      category = categoryMap[parsedCategoryId]
    }
  }

  // 썸네일 처리: 빈 문자열이면 null, 값이 있으면 업데이트, undefined면 기존 유지
  let newThumbnailUrl = shorts.thumbnailUrl
  if (thumbnailUrl !== undefined) {
    newThumbnailUrl = thumbnailUrl === '' ? null : thumbnailUrl
  }

  // 업데이트된 숏츠 데이터
  const updatedShorts = {
    ...shorts,
    title: title || shorts.title,
    description: description !== undefined ? description : shorts.description,
    category: category,
    status: status || shorts.status,
    keywords: keywords || shorts.keywords || [],
    thumbnailUrl: newThumbnailUrl,
  }

  // DB 업데이트
  db.get('shorts').find({ shortsId: shortsId }).assign(updatedShorts).write()

  // 실제 API 스키마에 맞는 응답 반환
  const response = {
    success: true,
    message: '숏츠 수정 성공',
    data: {
      shortsId: updatedShorts.id,
      title: updatedShorts.title,
      description: updatedShorts.description,
      videoUrl: updatedShorts.videoUrl,
      thumbnailUrl: updatedShorts.thumbnailUrl,
      uploader: updatedShorts.uploader,
      category: updatedShorts.category,
      keywords: updatedShorts.keywords,
      status: updatedShorts.status,
      durationSec: updatedShorts.durationSec || 60,
    },
  }

  res.json(response)
})

// ==========================================
// 8-3. 숏츠 삭제 (DELETE /api/v1/shorts/:id)
// ==========================================
server.delete('/api/v1/shorts/:id', (req, res) => {
  const db = router.db
  const shortsId = parseInt(req.params.id)

  const shorts = db.get('shorts').find({ shortsId: shortsId }).value()

  if (!shorts) {
    return res.status(404).json({
      success: false,
      message: '숏츠를 찾을 수 없습니다.',
    })
  }

  // DB에서 삭제
  db.get('shorts').remove({ shortsId: shortsId }).write()

  res.json({
    success: true,
    message: '숏츠가 삭제되었습니다.',
  })
})

// ==========================================
// 9. 라우팅 설정 (Prefix: /api)
// ==========================================
// 나머지 라우트는 json-server 기본 동작(db.json CRUD)을 따름
server.use('/api', router)

// 서버 시작
const PORT = 4000
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`)
  console.log(`- Login: POST /api/v1/auth/login`)
  console.log(`- Register: POST /api/v1/auth/register`)
  console.log(`- Me:    GET /api/v1/users/me`)
  console.log(`- Posts: GET /api/v1/posts`)
  console.log('- MyShorts: GET /api/v1/users/me/shorts')
  console.log('- Shorts: GET /api/v1/shorts/:id')
  console.log('- Shorts: PATCH /api/v1/shorts/:id')
  console.log('- Shorts: DELETE /api/v1/shorts/:id')
  console.log('- Comments: GET /api/v1/shorts/:shortsId/comments')
  console.log('- Comments: POST /api/v1/posts/:postId/comments')
})
