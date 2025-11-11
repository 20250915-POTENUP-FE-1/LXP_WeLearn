import { LECTURELIST_COLLECTION_NAME } from '../../lib/firebase/table/ddl';

export const registLectureService = async ({ formData }) => {
  try {
    const baseRef = collection(db, LECTURELIST_COLLECTION_NAME);
  } catch (error) {
    console.log(error);
  }
};
