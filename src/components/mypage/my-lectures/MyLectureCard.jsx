import { useNavigate } from 'react-router-dom';
import CATEGORIES from '../../../constants/categories.js';

const MyLectureCard = (props) => {
  const {
    category,
    content,
    curriculum,
    description,
    lectureCreatedAt,
    lectureId,
    level,
    studentCount,
    thumbnailUrl,
    title,
    userId,
    userName,
  } = props;
  const cat = CATEGORIES.find((e) => e.id === category);
  const navigate = useNavigate();

  const handleMoveToDetail = () => {
    navigate(`/lectures/detail/${lectureId}`);
  };

  return (
    <div
      role="button"
      onClick={handleMoveToDetail}
      className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
    >
      <div className="flex flex-col sm:flex-row">
        {/* 썸네일 */}
        <div className="lecture-item__thumbnail aspect-video flex-shrink-0 bg-gray-200 sm:aspect-auto sm:w-48">
          <img
            src={thumbnailUrl || 'https://dr.savee-cdn.com/things/6/6/0d3d5da690b611c98f76a2.webp'}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* 콘텐츠 */}
        <div className="lecture-item__content flex-1 p-6">
          <div className="mb-3 flex items-start justify-between">
            <div className="flex-1">
              <span className="mb-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-900">
                {/*{cat.name}*/}
              </span>

              <h3 className="mb-2 text-lg font-bold text-gray-900">{title}</h3>
              <p className="mb-4 text-sm text-gray-600">{userName}</p>
            </div>

            <button
              className="ml-4 flex-shrink-0 text-gray-400 transition-colors hover:text-red-500"
              aria-label="찜하기 취소"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          </div>

          <p className="mb-4 line-clamp-2 text-sm text-gray-700">{description}</p>

          {/* 하단 액션 / 부가 정보 */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>수강생 {studentCount}명</span>
            <span>{level}</span>
          </div>

          {/* 버튼 */}
          <div className="mt-4 flex items-center justify-end">
            <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800">
              학습하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLectureCard;
