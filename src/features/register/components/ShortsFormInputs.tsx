'use client'

import { Input } from '@/components/ui/Input'

interface FormInputData {
  title: string
  description: string
  isPublic: boolean
}

interface ShortsFormInputsProps {
  formData: FormInputData
  onChange: (field: keyof FormInputData, value: string | boolean) => void
}

export default function ShortsFormInputs({ formData, onChange }: ShortsFormInputsProps) {
  const { title, description, isPublic } = formData

  return (
    <>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">숏츠 제목</label>
        <Input
          type="text"
          name="title"
          value={title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="제목을 입력하세요."
          className="border-gray-300 bg-white text-sm focus:ring-black focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">숏츠 설명</label>
        <textarea
          value={description}
          name="description"
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="내용을 입력하세요."
          rows={4}
          className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">공개 여부</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChange('isPublic', true)}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
              isPublic
                ? 'border-2 border-black bg-black text-white'
                : 'border-2 border-gray-200 bg-white text-gray-600'
            }`}
          >
            공개
          </button>
          <button
            type="button"
            onClick={() => onChange('isPublic', false)}
            className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
              !isPublic
                ? 'border-2 border-black bg-black text-white'
                : 'border-2 border-gray-200 bg-white text-gray-600'
            }`}
          >
            비공개
          </button>
        </div>
      </div>
    </>
  )
}
