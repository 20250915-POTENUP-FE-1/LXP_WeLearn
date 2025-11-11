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
export default function Textarea({
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

      <textarea
        type={type}
        id={inputId}
        name={name}
        required={required}
        aria-required={required ? 'true' : 'false'}
        value={value}
        onChange={onChange}
        className={[
          'w-full rounded-lg border border-gray-300 px-4 py-3 text-base transition-colors',
          'h-50 resize-none placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-gray-900 focus:outline-none',
          className,
          type === 'password' ? 'pr-10' : '',
        ].join(' ')}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}
