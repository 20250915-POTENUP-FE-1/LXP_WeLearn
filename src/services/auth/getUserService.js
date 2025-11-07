import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase/config.js';
import { USERS_COLLECTION_NAME } from '../../lib/firebase/table/ddl.js';
/**
 * 사용자 프로필 조회
 * @param {string} uid - 사용자 UID
 * @returns {object} 사용자 정보 { id, email, name, address, gender, role }
 */
export const getUserProfile = async (uid) => {
  const docRef = await getDoc(doc(db, USERS_COLLECTION_NAME, uid));
  return {
    id: docRef.id,
    ...docRef.data(),
  };
};
