import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldBan, LockKeyhole, Home, ArrowLeft } from 'lucide-react';
import Button from '../../../components/ui/Button.jsx';

const Error403 = () => {
  const location = useLocation();
  // state가 없을 수도 있으니 안전하게 디폴트 처리
  const state = (location && location.state) || {};
  const from = state.from || null;
  const required = Array.isArray(state.required) ? state.required : [];
  const have = typeof state.have === 'string' ? state.have : null;

  const navigate = useNavigate();

  return (
    <div className="flex h-full items-center justify-center px-4">
      <div className="w-full max-w-lg p-8 text-gray-800">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-500/30">
          <ShieldBan className="h-8 w-8 text-red-400" />
        </div>

        <h1 className="text-center text-2xl font-bold">403 · 권한이 없습니다</h1>

        {required.length > 0 && (
          <p className="mt-2 text-center text-sm text-gray-400">
            필요한 권한: <b>{required.join(', ')}</b>
            {have ? ` · 현재: ${have}` : ''}
          </p>
        )}

        <div className="mt-6 flex justify-center gap-3">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2"
          >
            이전 페이지
          </Button>
          <Button
            size="sm"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2"
          >
            홈으로
          </Button>
        </div>

        {from && (
          <p className="mt-4 text-center text-xs text-gray-500">
            차단된 경로: <code className="text-gray-400">{from.pathname || String(from)}</code>
          </p>
        )}
      </div>
    </div>
  );
};

export default Error403;
