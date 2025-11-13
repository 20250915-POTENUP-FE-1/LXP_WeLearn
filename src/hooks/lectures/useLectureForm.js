import { useState } from 'react';

// 빈 lesson 템플릿
const EMPTY_LESSON = {
  lessonId: '',
  lessonMediaUrl: '',
  lessonTitle: '',
};

function appendEmptyLessonToChapter(curriculum, chapterIndex, template = EMPTY_LESSON) {
  return curriculum.map((chapter, idx) =>
    idx === chapterIndex
      ? { ...chapter, lessons: [...(chapter.lessons ?? []), { ...template }] }
      : chapter,
  );
}

function removeLessonFromChapter(curriculum, chapterIndex, lessonIndex) {
  return curriculum.map((chapter, index) =>
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
      curriculum: [
        ...prev.curriculum,
        { chapterTitle: '', lessons: [{ lessonId: '', lessonMediaUrl: '', lessonTitle: '' }] },
      ],
    }));

  // 레슨 추가
  const addLesson = (chapterIndex) => {
    setFormData((prev) => ({
      ...prev,
      curriculum: appendEmptyLessonToChapter(prev.curriculum, chapterIndex),
    }));
  };

  // 챕터 삭제
  const deleteChapter = (chapterIndex) => {
    setFormData((prev) => {
      const updated = prev.curriculum.filter((_, index) => index !== chapterIndex);
      return { ...prev, curriculum: updated };
    });
    return;
  };

  // 레슨 삭제
  const deleteLesson = (chapterIndex, lessonIndex) => {
    setFormData((prev) => {
      const currLessons = prev.curriculum[chapterIndex].lessons;
      if (currLessons.length <= 1) return prev; // 최소 1개 유지

      return {
        ...prev,
        curriculum: removeLessonFromChapter(prev.curriculum, chapterIndex, lessonIndex),
      };
    });
  };
  return { formData, setFormData, addLesson, deleteChapter, deleteLesson, addChapter };
};

export default useLectureForm;
