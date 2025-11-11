import React from 'react';

function CreateThumNail() {
  return (
    <aside className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">썸네일 이미지 *</h2>
      <div className="space-y-3">
        <input
          id="thumb"
          name="thumb"
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
          required
        />
        <p className="text-sm text-gray-500">권장 16:9, JPG/PNG/WEBP</p>
        <div
          className="mt-4 flex aspect-video w-full items-center justify-center rounded-lg bg-gray-100 text-gray-400"
          aria-hidden="true"
        >
          미리보기 영역
        </div>
      </div>
    </aside>
  );
}

export default CreateThumNail;
