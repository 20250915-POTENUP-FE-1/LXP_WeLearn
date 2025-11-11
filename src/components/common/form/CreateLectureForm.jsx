import React, { useState } from 'react';
import CreateLectureTitle from '../../create-lecture/CreateLectureTitle';
import Input from './Input';
import Textarea from './Textarea';
import SelectOption from './SelectOption';
import CATEGORIRES from '../../../constants/categories';
import CreateCurriculum from '../../create-lecture/CreateCurriculum';
import CreateThumNail from '../../create-lecture/CreateThumNail';

function CreateLectureForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    level: '',
    category: '',
    thumbnailUrl: '',
    userName: '',
    content: '',
    curriculums: [
      {
        chapterTitle: '',
        lessons: [{ lessonId: '', lessonMediaUrl: '', lessonTitle: '', runingTime: '' }],
      },
    ],
  });

  const level = [
    { key: '입문', value: 'begginer', name: '입문' },
    { key: '초급', value: 'low', name: '초급' },
    { key: '중급', value: 'middle', name: '중급' },
    { key: '고급', value: 'high', name: '고급' },
  ];

  const handleLectureData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // ✅ 챕터 추가
  const addChapter = () => {
    setFormData((prev) => ({
      ...prev,
      curriculums: [
        ...prev.curriculums,
        { chapterTitle: '', lessons: [{ lessonId: '', lessonMediaUrl: '', lessonTitle: '' }] },
      ],
    }));
  };

  return (
    <div
      id="main"
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      data-page="create-course"
    >
      <CreateLectureTitle />
      <form className="space-y-6" aria-describedby="form-desc">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="space-y-6 rounded-lg bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">기본 정보</h2>

            <div className="space-y-2">
              <Input
                label="강의 제목"
                id="title"
                type="text"
                aria-required="true"
                placeholder="강의 제목을 입력해주세요"
                value={formData.title}
                onChange={handleLectureData}
                required
              />
            </div>

            <div className="space-y-2">
              <Input
                label="강의 설명"
                id="description"
                type="text"
                aria-required="true"
                placeholder="강의에 대한 간략한 설명을 입력해주세요"
                value={formData.description}
                onChange={handleLectureData}
                required
              />
              <Textarea
                label="강의 내용"
                id="content"
                aria-required="true"
                placeholder="강의 내용을 입력해주세요."
                value={formData.content}
                onChange={handleLectureData}
                required
              />
            </div>

            {/* 레벨 선택  */}
            <SelectOption
              label="난이도"
              id="level"
              aria-required="true"
              placeholder="옵션을 선택해주세요."
              options={level}
              value={formData.level}
              onChange={handleLectureData}
              required
            />

            {/* <!-- 1차 카테고리 --> */}
            <SelectOption
              label="카테고리"
              id="category"
              aria-required="true"
              placeholder="카테고리를 선택해주세요."
              options={[...CATEGORIRES]}
              value={formData.category}
              onChange={handleLectureData}
              required
            />
          </section>

          {/* <!-- 우측: 썸네일 --> */}
          <CreateThumNail />
        </div>

        {/* <!-- 커리큘럼: 섹션(아코디언) + 하위 레슨 --> */}
        <section className="rounded-lg bg-white p-6 shadow-sm" aria-labelledby="curi-title">
          <h2 id="curi-title" className="mb-4 text-xl font-semibold text-gray-900">
            커리큘럼 구성
          </h2>
          <CreateCurriculum curriculums={formData.curriculums} setFormData={setFormData} />
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              id="addSectionBtn"
              onClick={addChapter}
              className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              + 챕터 추가
            </button>
          </div>
        </section>

        {/* <!-- 하단 스티키 액션 바 --> */}
        <div
          className="sticky bottom-0 -mx-4 flex justify-end gap-3 border-gray-200 bg-gray-100/70 px-4 py-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          role="group"
          aria-label="제출 동작"
        >
          <a
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
            href="/instructor/my-lectures"
          >
            취소
          </a>
          <button
            type="submit"
            className="rounded-lg bg-black px-8 py-3 text-lg font-medium text-white hover:bg-gray-800"
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateLectureForm;
