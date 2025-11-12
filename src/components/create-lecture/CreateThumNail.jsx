import React, { useState } from 'react';
import { CirclePlus } from 'lucide-react';

function CreateThumbnail({ formData, setFormData }) {
  const [preview, setPreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = (file) => {
    // 미리보기용 URL
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Base64 변환 준비
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFormData({ ...formData, thumbnailUrl: base64String }); // formData에 저장
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) handleFile(files[0]);
  };

  return (
    <aside className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">썸네일 이미지</h2>

      <label
        htmlFor="thumb"
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        // onDrag={() => {setIsDragOver(true)}}
        DragLeave={() => setIsDragOver(false)}
        className={`group mt-4 flex aspect-video min-h-[200px] w-full cursor-pointer flex-col items-center justify-center rounded-lg text-gray-400 shadow-sm transition-all duration-200 ${isDragOver ? 'bg-gray-200 text-[#1a1a1a] shadow-md' : 'bg-gray-100 hover:text-[#1a1a1a] hover:shadow-md'} `}
      >
        {preview ? (
          <img
            src={preview}
            alt="썸네일 미리보기"
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center" aria-hidden="true">
            <CirclePlus size={48} strokeWidth={1} />
            <p className="text-sm text-gray-500 group-hover:text-[#1a1a1a]">JPG/JPEG/PNG/WEBP</p>
            {isDragOver && <p className="mt-2 text-sm font-medium text-[#1a1a1a]">Drag & Drop</p>}
          </div>
        )}

        <input
          id="thumb"
          name="thumb"
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          className="hidden"
          onChange={handleFileChange}
          required
          aria-required="true"
        />
      </label>
    </aside>
  );
}

export default CreateThumbnail;
