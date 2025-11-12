import React, { Fragment } from 'react';
import Input from '../common/form/Input';
import { X, Minus } from 'lucide-react';

function CreateCurriculum({ curriculums, setFormData }) {
  // 빈 lesson 템플릿
  const EMPTY_LESSON = {
    lessonId: '',
    lessonMediaUrl: '',
    lessonTitle: '',
  };

  const disabled = 'cursor-not-allowed text-gray-400';
  const abled = 'text-[#1a1a1a] hover:text-gray-700 active:scale-95';

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

  const deleteChapter = (chapterIndex) => {
    setFormData((prev) => {
      const updated = prev.curriculums.filter((_, index) => index !== chapterIndex);
      return { ...prev, curriculums: updated };
    });
    return;
  };

  function removeLessonFromChapter(curriculums, chapterIndex, lessonIndex) {
    return curriculums.map((chapter, index) =>
      index === chapterIndex
        ? {
            ...chapter,
            lessons: chapter.lessons.filter((_, secondIndex) => secondIndex !== lessonIndex),
          }
        : chapter,
    );
  }

  const deleteLesson = (chapterIndex, lessonIndex) => {
    if (curriculums[chapterIndex].lessons.length > 1) {
      setFormData((prev) => ({
        ...prev,
        curriculums: removeLessonFromChapter(prev.curriculums, chapterIndex, lessonIndex),
      }));
    }
    return;
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
                  <span className="text-gray-70 min-w-4 items-center justify-center pt-8 font-semibold after:content-['.']">
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
                    aria-label="챕터 삭제"
                    disabled={curriculums.length <= 1}
                    onClick={() => deleteChapter(chapterIndex)}
                    className={`flex items-center justify-center rounded-md px-3 py-1 pt-8 text-sm font-medium transition-all duration-200 ${
                      curriculums.length <= 1 ? disabled : abled
                    }`}
                  >
                    <X size={24} color={curriculums.length <= 1 ? '#9ca3af' : '#1a1a1a'} />
                  </button>
                </div>

                <div className="flex flex-col space-y-3 p-4">
                  <ol className="flex flex-col justify-end gap-3 rounded-lg">
                    {chapter.lessons.map((lesson, lessonIndex) => {
                      return (
                        // 레슨
                        <li className="flex items-center gap-2" key={lessonIndex + 1}>
                          <span className="text-gray-70 pr min-w-4 items-center justify-center pt-8 font-semibold">
                            {`${chapterIndex + 1}.${lessonIndex + 1}`}
                          </span>
                          <Input
                            name="lessonTitle"
                            id="lessonTitle"
                            label="레슨 제목"
                            required
                            placeholder="예: 코딩이란?"
                            type="text"
                            outerClassName="flex-1"
                            value={lesson.lessonTitle}
                            onChange={(e) => {
                              handleLessonChange(chapterIndex, lessonIndex, e.target.value);
                            }}
                          />
                          {/* <Input
                            name="mediaRuningTime"
                            id="mediaRuningTime"
                            lable="시간"
                            type="text"
                            placeholder="00:00"
                            label="영상 시간"
                            outerClassName="col-span-2"
                            value={lesson.runingTime}
                            onChange={(e) => {
                              handleRuningTimeChange(chapterIndex, lessonIndex, e.target.value);
                            }}
                          /> */}
                          <button
                            type="button"
                            className={`flex items-center justify-center rounded-md px-3 py-1 pt-8 text-sm font-medium transition-all duration-200 ${
                              curriculums[chapterIndex].lessons.length < 1 ? disabled : abled
                            }`}
                            disabled={curriculums[chapterIndex].lessons.length < 1}
                            aria-label="레슨 삭제"
                            onClick={() => {
                              deleteLesson(chapterIndex, lessonIndex);
                            }}
                          >
                            <Minus
                              size={24}
                              color={
                                curriculums[chapterIndex].lessons.length < 1 ? '#9ca3af' : '#1a1a1a'
                              }
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ol>
                  <div className="px-6">
                    <button
                      type="button"
                      onClick={() => addLesson(chapterIndex)}
                      className="mt-4 w-26 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                    >
                      + 레슨 추가
                    </button>
                  </div>
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
