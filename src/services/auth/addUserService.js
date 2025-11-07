import { setDoc, doc } from 'firebase/firestore';
import { ENUM_USER_ROLE } from '../../constants/constants.js';
import { db } from '../../lib/firebase/config.js';
import { USERS_COLLECTION_NAME } from '../../lib/firebase/table/ddl.js';

export const addUserProfile = async (uid, user) => {
  await setDoc(doc(db, USERS_COLLECTION_NAME, uid), {
    ...user,
    role: ENUM_USER_ROLE.user,
  });
};
