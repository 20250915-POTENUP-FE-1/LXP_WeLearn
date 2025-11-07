import React from 'react';
import Required from '../../ui/Required.jsx';

/**
 * @typedef {Object} InputProps
 * @property {string} name               - input name (필수)
 * @property {string} [id]               - 지정 없으면 name을 id로 사용
 * @property {string} [label='이름']      - 라벨 텍스트
 * @property {string} [value='']         - 컨트롤드 값
 * @property {(e: import('react').ChangeEvent<HTMLInputElement>) => void} onChange - 변경 핸들러(필수)
 * @property {boolean} [required=true]   - 필수 여부
 * @property {string} [placeholder='홍길동'] - 플레이스홀더
 * @property {string} [className='']     - 추가 클래스
 */
export default function Input({
  name,
  id,
  label = '이름',
  value = '',
  onChange,
  required = true,
  placeholder = '홍길동',
  className = '',
  type = 'text',
}) {
  const inputId = id || name;

  return (
    <div className="relative">
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-gray-700">
        {label} <Required />
      </label>

      <input
        type={type}
        id={inputId}
        name={name}
        required={required}
        aria-required={required ? 'true' : 'false'}
        value={value}
        onChange={onChange}
        className={[
          'w-full rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors',
          'placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none',
          className,
          type === 'password' ? 'pr-10' : '',
        ].join(' ')}
        placeholder={placeholder}
      />
      {type === 'password' && (
        <button
          type="button"
          className="absolute right-3 bottom-[15px] text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="비밀번호 표시/숨기기"
          tabIndex={-1}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
