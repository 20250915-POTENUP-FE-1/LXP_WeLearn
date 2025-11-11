import React from 'react';
import Required from '../../ui/Required.jsx';

/**
 * @typedef {Object} SelectOptionProps
 * @property {string} name                                     - select name (필수)
 * @property {string} [id]                                     - 지정 없으면 name을 id로 사용
 * @property {string} [label='선택']                            - 라벨 텍스트
 * @property {string} [value='']                               - 컨트롤드 값
 * @property {(e: import('react').ChangeEvent<HTMLSelectElement>) => void} onChange - 변경 핸들러 (필수)
 * @property {boolean} [required=true]                         - 필수 여부
 * @property {string} [placeholder='선택하세요']                 - placeholder 텍스트 (첫 번째 disabled 옵션)
 * @property {string} [className='']                           - 추가 클래스
 * @property {Array<{ value: string, label: string } | string>} [options=[]] - 옵션 목록 (문자열 또는 객체 배열)
 */

/**
 * @param {SelectOptionProps} props
 */
export default function SelectOption({
  id,
  name,
  label = '선택',
  value = '',
  onChange,
  required = true,
  options = [],
  placeholder = '선택하세요',
  className = '',
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} <Required />
      </label>

      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-gray-500 ${className}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.key || option} value={option.value || option}>
            {option.name || option}
          </option>
        ))}
      </select>
    </div>
  );
}
