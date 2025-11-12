import { useState } from 'react';

// 빈 lesson 템플릿
const EMPTY_LESSON = {
  lessonId: '',
  lessonMediaUrl: '',
  lessonTitle: '',
};

function appendEmptyLessonToChapter(curriculums, chapterIndex, template = EMPTY_LESSON) {
  return curriculums.map((chapter, idx) =>
    idx === chapterIndex
      ? { ...chapter, lessons: [...(chapter.lessons ?? []), { ...template }] }
      : chapter,
  );
}

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

const useLectureForm = (initialFormData) => {
  const [formData, setFormData] = useState(initialFormData);
  // 챕터 추가
  const addChapter = (setFormData) =>
    setFormData((prev) => ({
      ...prev,
      curriculums: [
        ...prev.curriculums,
        { chapterTitle: '', lessons: [{ lessonId: '', lessonMediaUrl: '', lessonTitle: '' }] },
      ],
    }));

  // 레슨 추가
  const addLesson = (chapterIndex) => {
    setFormData((prev) => ({
      ...prev,
      curriculums: appendEmptyLessonToChapter(prev.curriculums, chapterIndex),
    }));
  };

  // 챕터 삭제
  const deleteChapter = (chapterIndex) => {
    setFormData((prev) => {
      const updated = prev.curriculums.filter((_, index) => index !== chapterIndex);
      return { ...prev, curriculums: updated };
    });
    return;
  };

  // 레슨 삭제
  const deleteLesson = (chapterIndex, lessonIndex) => {
    if (formData.curriculums[chapterIndex].lessons.length > 1) {
      setFormData((prev) => ({
        ...prev,
        curriculums: removeLessonFromChapter(prev.curriculums, chapterIndex, lessonIndex),
      }));
    }
    return;
  };
  return { formData, setFormData, addLesson, deleteChapter, deleteLesson, addChapter };
};

export default useLectureForm;
