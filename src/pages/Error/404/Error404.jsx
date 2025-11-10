import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileQuestion } from 'lucide-react';
import Button from '../../../components/ui/Button.jsx';

const Error404 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tried = location?.pathname || '/';

  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="w-full max-w-lg p-8 text-gray-800">
        {/* 아이콘 */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ring-1 ring-gray-300">
          <FileQuestion className="h-8 w-8 text-gray-500" aria-hidden />
        </div>

        <h1 className="text-center text-2xl font-bold">404 · 페이지를 찾을 수 없습니다</h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          요청하신 주소가 변경되었거나 존재하지 않습니다.
        </p>

        {/* 시도한 경로 표시(선택) */}
        {tried && (
          <p className="mt-3 text-center text-xs text-gray-400">
            경로: <code className="text-gray-500">{tried}</code>
          </p>
        )}

        {/* 액션 */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2"
          >
            이전 페이지
          </Button>

          <Link to="/" className="inline-flex">
            <Button size="sm" className="inline-flex items-center gap-2">
              홈으로
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
