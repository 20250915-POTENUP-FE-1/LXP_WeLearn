import React, { Fragment } from 'react';
import Input from '../common/form/Input';
import { X } from 'lucide-react';

function CreateCurriculum({ curriculums, setFormData }) {
  // 빈 lesson 템플릿
  const EMPTY_LESSON = {
    lessonId: '',
    lessonMediaUrl: '',
    lessonTitle: '',
    runingTime: '',
  };

  function appendEmptyLessonToChapter(curriculums, chapterIndex, template = EMPTY_LESSON) {
    return curriculums.map((chapter, idx) =>
      idx === chapterIndex
        ? { ...chapter, lessons: [...(chapter.lessons ?? []), { ...template }] }
        : chapter,
    );
  }

  const handleChapterTitle = (index, value) => {
    setFormData((prev) => {
      const updated = prev.curriculums;
      updated[index].chapterTitle = value;
      return { ...prev, curriculums: updated };
    });
  };
  // ✅ 레슨 제목 변경
  const handleLessonChange = (chapterIndex, lessonIndex, value) => {
    setFormData((prev) => {
      const updated = prev.curriculums;
      updated[chapterIndex].lessons[lessonIndex].lessonTitle = value;
      return { ...prev, curriculums: updated };
    });
  };

  const handleRuningTimeChange = (chapterIndex, lessonIndex, value) => {
    setFormData((prev) => {
      const updated = prev.curriculums;
      updated[chapterIndex].lessons[lessonIndex].runingTime = value;
      return { ...prev, curriculums: updated };
    });
  };

  // ✅ 레슨 추가
  const addLesson = (chapterIndex) => {
    setFormData((prev) => ({
      ...prev,
      curriculums: appendEmptyLessonToChapter(prev.curriculums, chapterIndex),
    }));
  };

  return (
    <>
      {curriculums.map((chapter, chapterIndex) => {
        return (
          <Fragment key={chapterIndex}>
            <div
              id="curriculumList"
              className="mb-3 space-y-4"
              aria-live="polite"
              key={chapterIndex}
            >
              {/* 챕터 */}
              <div className="rounded-lg border border-gray-200" open>
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 hover:bg-gray-100">
                  <span className="text-gray-70 min-w-4 items-center justify-center pt-6 font-semibold after:content-['.']">
                    {`${chapterIndex + 1}`}
                  </span>

                  <Input
                    label="챕터 제목"
                    name="chapterTitle"
                    id="chapterTitle"
                    type="text"
                    required
                    aria-required="true"
                    placeholder="챕터 제목을 입력해주세요."
                    value={chapter.chapterTitle}
                    onChange={(e) => {
                      handleChapterTitle(chapterIndex, e.target.value);
                    }}
                  />
                  <button
                    type="button"
                    className="w-13 px-3 py-1 pt-6 text-sm font-medium text-red-600 hover:text-red-700"
                    aria-label="섹션 삭제"
                  >
                    <X size={24} color="#1a1a1a" />
                  </button>
                </div>
                <div className="space-y-3 p-4">
                  <ol className="space-y-2">
                    {chapter.lessons.map((lesson, lessonIndex) => {
                      return (
                        // 레슨
                        <li className="grid grid-cols-20 items-center gap-2" key={lessonIndex}>
                          <Input
                            name="lessonTitle"
                            id="lessonTitle"
                            label="레슨 제목"
                            required
                            placeholder="예: 코딩이란?"
                            type="text"
                            outerClassName="col-span-17"
                            value={lesson.lessonTitle}
                            onChange={(e) => {
                              handleLessonChange(chapterIndex, lessonIndex, e.target.value);
                            }}
                          />
                          <Input
                            name="mediaRuningTime"
                            id="mediaRuningTime"
                            lable="시간"
                            type="text"
                            placeholder="00:00"
                            required
                            aria-required="true"
                            label="영상 시간"
                            outerClassName="col-span-2"
                            value={lesson.runingTime}
                            onChange={(e) => {
                              handleRuningTimeChange(chapterIndex, lessonIndex, e.target.value);
                            }}
                          />
                          <button
                            type="button"
                            className="px-3 py-1 pt-6 text-sm font-medium text-red-600 hover:text-red-700"
                            aria-label="레슨 삭제"
                          >
                            <X size={24} color="#1a1a1a" />
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                  <button
                    type="button"
                    onClick={() => addLesson(chapterIndex)}
                    className="add-lesson rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    + 레슨 추가
                  </button>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
}

export default CreateCurriculum;
