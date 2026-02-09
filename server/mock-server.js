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
  const publicPaths = [
    '/api/v1/auth/login',
    '/api/v1/auth/signup',
    '/api/v1/auth/logout',
    /^\/api\/v1\/shorts\/\d+\/comments$/, // 댓글 GET/POST
    /^\/api\/v1\/comments\/\d+\/replies$/, // 대댓글 GET/POST
    /^\/api\/v1\/comments\/\d+$/,
    /^\/api\/v1\/replies\/\d+$/,
  ]

  // 1️⃣ GET 요청은 대부분 공개
  if (req.method === 'GET' && !req.path.startsWith('/api/v1/users/me')) {
    return next()
  }

  // 2️⃣ 공개 경로인지 체크 (문자열 + 정규식 모두 지원)
  const isPublic = publicPaths.some((path) => {
    if (path instanceof RegExp) {
      return path.test(req.path)
    }
    return path === req.path
  })

  // 3️⃣ 공개 경로가 아니면 토큰 검사
  if (!isPublic) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: '로그인이 필요합니다 (토큰 없음).',
      })
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
  const currentUserId = 16
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
server.post('/api/v1/shorts/:shortsId/comments', (req, res) => {
  const db = router.db
  const shortsId = Number(req.params.shortsId)
  const { content } = req.body

  if (!content) {
    return res.status(400).json({
      success: false,
      message: 'content is required',
    })
  }

  const CURRENT_USER = {
    userId: 16,
    nickname: '먕먕먕',
    profileImageUrl: null,
  }

  const newComment = {
    commentId: Date.now(),
    shortsId,
    content,
    createdAt: new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString(),
    isMine: true,
    replyCount: 0,
    writer: {
      userId: CURRENT_USER.userId,
      nickname: CURRENT_USER.nickname,
      profileImageUrl: CURRENT_USER.profileImageUrl,
    },
  }

  db.get('comments').push(newComment).write()

  return res.status(201).json({
    success: true,
    data: newComment,
  })
})

// GET 댓글 조회
server.get('/api/v1/shorts/:shortsId/comments', (req, res) => {
  const db = router.db
  const shortsId = Number(req.params.shortsId)

  const comments = db.get('comments').filter({ shortsId }).value()

  const result = comments.map((comment) => {
    return {
      commentId: comment.commentId,
      shortsId: comment.shortsId,
      content: comment.content,
      createdAt: comment.createdAt,
      writer: comment.writer, // ✅ 그대로 사용
      replyCount: comment.replyCount,
      isMine: comment.isMine,
    }
  })

  res.json({ success: true, data: result })
})

// PATCH 댓글 수정
server.patch('/api/v1/comments/:commentId', (req, res) => {
  const db = router.db
  const commentId = Number(req.params.commentId)
  const { content } = req.body

  const comment = db.get('comments').find({ commentId: commentId }).value()

  if (!content || typeof content !== 'string' || !content.trim()) {
    return res.status(400).json({ success: false, message: '내용이 필요합니다.' })
  }

  if (!comment) {
    return res.status(404).json({ success: false })
  }

  db.get('comments').find({ commentId: commentId }).assign({ content }).write()

  res.json({ success: true })
})

// delete 댓글 삭제
server.delete('/api/v1/comments/:commentId', (req, res) => {
  const db = router.db
  const commentId = Number(req.params.commentId)

  const comment = db.get('comments').find({ commentId }).value()

  if (!comment) {
    return res.status(404).json({ success: false })
  }

  // 2️⃣ 해당 댓글의 모든 대댓글 삭제
  db.get('replies')
    .remove((r) => r.parentId === commentId)
    .write()

  // 3️⃣ 댓글 삭제
  db.get('comments')
    .remove((c) => c.commentId === commentId)
    .write()

  res.json({ success: true })
})

// ==========================================
// 8. 대댓글 api
// ==========================================
// 대댓글 목록 조회
server.get('/api/v1/comments/:commentId/replies', (req, res) => {
  const db = router.db
  const commentId = Number(req.params.commentId)

  const replies = db.get('replies').filter({ parentId: commentId }).value()

  const result = replies.map((reply) => {
    return {
      replyId: reply.replyId,
      parentId: reply.parentId,
      content: reply.content,
      createdAt: reply.createdAt,
      writer: reply.writer,
      isMine: reply.isMine,
    }
  })

  res.json({ success: true, data: result })
})

// 대댓글 작성
server.post('/api/v1/comments/:commentId/replies', (req, res) => {
  const db = router.db
  const parentId = Number(req.params.commentId)
  const { content } = req.body

  const CURRENT_USER = {
    userId: 16,
    nickname: '먕먕먕',
    profileImageUrl: null,
  }

  if (!content) {
    return res.status(400).json({ success: false, message: 'content is required' })
  }

  // 원본 댓글 가져오기
  const parentComment = db.get('comments').find({ commentId: parentId }).value()
  if (!parentComment) {
    return res.status(404).json({ success: false, message: 'Parent comment not found' })
  }

  // 새로운 reply 생성
  const newReply = {
    replyId: Date.now(),
    parentId,
    writer: {
      userId: CURRENT_USER.userId,
      nickname: CURRENT_USER.nickname,
      profileImageUrl: CURRENT_USER.profileImageUrl,
    },
    content,
    isMine: true,
    createdAt: new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString(), // KST
  }

  // replies DB에 추가
  db.get('replies').push(newReply).write()

  // 원본 comment replyCount 1 증가
  db.get('comments')
    .find({ commentId: parentId })
    .assign({ replyCount: (parentComment.replyCount || 0) + 1 })
    .write()

  res.status(201).json({
    success: true,
    data: { replyId: newReply.id },
  })
})

// 대댓글 수정
server.patch('/api/v1/replies/:replyId', (req, res) => {
  const db = router.db
  const replyId = Number(req.params.replyId)
  const { content } = req.body

  if (!content || typeof content !== 'string' || !content.trim()) {
    return res.status(400).json({ success: false, message: '내용이 필요합니다.' })
  }

  const reply = db.get('replies').find({ replyId }).value()

  if (!reply || reply.parentId === null) {
    return res.status(404).json({ success: false })
  }

  db.get('replies').find({ replyId }).assign({ content }).write()

  res.json({
    success: true,
    data: { replyId, content },
  })
})

// 대댓글 삭제
server.delete('/api/v1/replies/:replyId', (req, res) => {
  const db = router.db
  const replyId = Number(req.params.replyId)

  // 1️⃣ 대댓글 찾기
  const reply = db.get('replies').find({ replyId }).value()

  if (!reply || reply.parentId === null) {
    return res.status(404).json({ success: false })
  }

  const parentId = reply.parentId

  // 2️⃣ 부모 댓글 찾기
  const parentComment = db.get('comments').find({ commentId: parentId }).value()

  if (!parentComment) {
    return res.status(404).json({ success: false })
  }

  // 3️⃣ replyCount 감소 (0 이하 방지)
  db.get('comments')
    .find({ commentId: parentId })
    .assign({
      replyCount: Math.max((parentComment.replyCount || 0) - 1, 0),
    })
    .write()

  // 4️⃣ 대댓글 삭제
  db.get('replies')
    .remove((r) => r.replyId === replyId)
    .write()

  res.json({ success: true })
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
      message: '숏츠를 찾을 수 없습니다.',
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
// 9. 키워드 API
// ==========================================
// GET 키워드 전체 목록 조회
server.get('/api/v1/keywords', (req, res) => {
  const db = router.db
  const { name_like } = req.query

  let keywords = db.get('keywords').value()

  // 검색어가 있는 경우 필터링
  if (name_like) {
    keywords = keywords.filter((keyword) =>
      keyword.name.toLowerCase().includes(name_like.toLowerCase()),
    )
  }

  res.json(keywords)
})

// ==========================================
// 11. 플레이리스트 API (Playlists)
// ==========================================

// [도우미 함수] 특정 숏츠 ID로 썸네일 URL 가져오기
const getThumbnailById = (db, shortsId) => {
  const shorts = db
    .get('shorts')
    .find({ shortsId: Number(shortsId) })
    .value()
  return shorts
    ? shorts.thumbnailUrl
    : 'https://images.pexels.com/photos/5483075/pexels-photo-5483075.jpeg'
}

// 1. 플레이리스트 생성 (POST /api/v1/playlists)
server.post('/api/v1/playlists', (req, res) => {
  const db = router.db
  const { title, description, shortsIds, thumbnailShortsId, visibility } = req.body

  const CURRENT_USER = { id: 1, nickname: '승일', profileUrl: '' }

  const newPlaylist = {
    id: Date.now(),
    title,
    description,
    visibility: visibility || 'PUBLIC',
    thumbnailUrl: getThumbnailById(db, thumbnailShortsId),
    thumbnailCustom: true,
    itemsCount: shortsIds ? shortsIds.length : 0,
    owner: CURRENT_USER,
    shortsIds: shortsIds || [], // 내부 관리를 위한 ID 배열
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  db.get('playlists').push(newPlaylist).write()

  res.status(201).json({
    success: true,
    code: 'Success',
    message: null,
    data: newPlaylist,
  })
})

// 2 & 3. 플레이리스트 목록 조회 (내 것 & 공개)
server.get(['/api/v1/playlists/me', '/api/v1/playlists/public'], (req, res) => {
  const db = router.db
  const isPublicOnly = req.path.includes('public')
  let playlists = db.get('playlists').value() || []

  if (isPublicOnly) {
    playlists = playlists.filter((p) => p.visibility === 'PUBLIC')
  } else {
    // 내 플레이리스트
    playlists = playlists.filter((p) => p.owner?.id === 1)
  }

  const page = parseInt(req.query.page) || 0
  const size = parseInt(req.query.size) || 10
  const startIndex = page * size
  const paginated = playlists.slice(startIndex, startIndex + size)

  res.json({
    success: true,
    code: 'SUCCESS',
    message: null,
    data: {
      content: paginated,
      pageable: {},
      totalPages: Math.ceil(playlists.length / size),
      totalElements: playlists.length,
    },
  })
})

// 4. 플레이리스트 상세 조회 (GET /api/v1/playlists/:id)
server.get('/api/v1/playlists/:id', (req, res) => {
  const db = router.db
  const playlistId = Number(req.params.id)

  const playlist = db.get('playlists').find({ id: playlistId }).value()

  if (!playlist) {
    return res.status(404).json({ success: false, message: 'Not Found' })
  }

  // playlist.items가 쇼츠 객체 배열이라고 가정
  const items = (playlist.items || []).map((shorts, index) => {
    return {
      itemId: 100 + index,
      position: index,
      shorts: shorts,
      addedAt: playlist.createdAt,
    }
  })

  res.json({
    success: true,
    code: 'Success',
    message: null,
    data: {
      ...playlist,
      items,
    },
  })
})

// 5. 메타데이터 수정 (POST - 설계서 기준)
server.post('/api/v1/playlists/:id', (req, res) => {
  const db = router.db
  const id = Number(req.params.id)
  const { title, description, thumbnailShortsId, visibility } = req.body

  const playlist = db.get('playlists').find({ id }).value()
  if (!playlist) return res.status(404).json({ success: false })

  const updated = {
    ...playlist,
    title: title || playlist.title,
    description: description || playlist.description,
    visibility: visibility || playlist.visibility,
    thumbnailUrl: thumbnailShortsId
      ? getThumbnailById(db, thumbnailShortsId)
      : playlist.thumbnailUrl,
    updatedAt: new Date().toISOString(),
  }

  db.get('playlists').find({ id }).assign(updated).write()

  res.json({ success: true, code: 'Success', message: null, data: updated })
})

// 6. 삭제
server.delete('/api/v1/playlists/:id', (req, res) => {
  router.db
    .get('playlists')
    .remove({ id: Number(req.params.id) })
    .write()
  res.status(204).end()
})

// 7. 숏츠 추가 (POST /api/v1/playlists/:id/items)
server.post('/api/v1/playlists/:id/items', (req, res) => {
  const db = router.db
  const id = Number(req.params.id)
  const { shortsId } = req.body

  const playlist = db.get('playlists').find({ id }).value()
  if (!playlist) return res.status(404).json({ success: false })

  const newShortsIds = [...(playlist.shortsIds || []), Number(shortsId)]

  db.get('playlists')
    .find({ id })
    .assign({
      shortsIds: newShortsIds,
      itemsCount: newShortsIds.length,
      updatedAt: new Date().toISOString(),
    })
    .write()

  // 상세 응답 (간소화)
  res.status(201).json({ success: true, code: 'Success', data: playlist })
})

// 8. 숏츠 제거
server.delete('/api/v1/playlists/:id/items/:shortsId', (req, res) => {
  const db = router.db
  const id = Number(req.params.id)
  const sid = Number(req.params.shortsId)

  const playlist = db.get('playlists').find({ id }).value()
  if (playlist) {
    const nextIds = playlist.shortsIds.filter((id) => id !== sid)
    db.get('playlists')
      .find({ id })
      .assign({
        shortsIds: nextIds,
        shortsCount: nextIds.length,
      })
      .write()
  }
  res.status(204).end()
})

// 10. 순서 변경 (POST /api/v1/playlists/:id/items/reorder)
server.post('/api/v1/playlists/:id/items/reorder', (req, res) => {
  const db = router.db
  const id = Number(req.params.id)
  const { shortsId, newIndex } = req.body

  const playlist = db.get('playlists').find({ id }).value()
  if (!playlist) return res.status(404).json({ success: false })

  let ids = [...playlist.shortsIds]
  const targetId = Number(shortsId)

  // 기존 위치 제거 후 새 위치 삽입
  ids = ids.filter((i) => i !== targetId)
  ids.splice(newIndex, 0, targetId)

  db.get('playlists')
    .find({ id })
    .assign({
      shortsIds: ids,
      updatedAt: new Date().toISOString(),
    })
    .write()

  res.json({ success: true, code: 'Success', data: playlist })
})

// ==========================================
// 10. 라우팅 설정 (Prefix: /api)
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
  console.log('- Keywords: GET /api/v1/keywords')
  console.log('# 1. 플레이리스트 생성: POST /api/v1/playlists')
  console.log('# 2. 내 플레이리스트 목록 조회: GET /api/v1/playlists/me')
  console.log('# 3. 공개 플레이리스트 목록 조회: GET /api/v1/playlists/public')
  console.log('# 4. 플레이리스트 상세 조회: GET /api/v1/playlists/:id')
  console.log('# 5. 플레이리스트 메타데이터 수정: POST /api/v1/playlists/:id')
  console.log('# 6. 플레이리스트 삭제: DELETE /api/v1/playlists/:id')
  console.log('# 7. 플레이리스트에 숏츠 추가: POST /api/v1/playlists/:id/items')
  console.log('# 8. 플레이리스트에서 숏츠 제거: DELETE /api/v1/playlists/:id/items/:shortsId')
  console.log('# 9. 플레이리스트 아이템 목록 조회: GET /api/v1/playlists/:id/items')
  console.log('# 10. 플레이리스트 내 아이템 순서 변경: POST /api/v1/playlists/:id/items/reorder')
})
