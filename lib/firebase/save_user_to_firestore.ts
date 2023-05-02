import {
  QueryDocumentSnapshot,
  doc,
  getDoc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";
import { UserData, AdditionalInformation } from "../../interface/Firebase/User";

//*function STORING USER DATA INTO FIRESTORE => USER SNAPSHOT **//
/*
{
user:
------uid:
--------displayName:
--------email:
--------etc:
}
*/

export const createUserDocumentFromAuth = async (
  userAuth: {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  },
  additionalInformation: AdditionalInformation = {}
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  try {
    if (!userAuth) return;

    //param doc (DATABASE,COLLECTION,UNIQUE IDENTIFIER)
    const userDocRef = doc(db, "users", userAuth.uid);

    // console.log(userDocRef);

    //* Get and check data function
    const userSnapshot = await getDoc(userDocRef);
    // console.log(userSnapshot);

    //* If the data doesn't exist in the database
    //* create / set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
      const { displayName, email, photoURL } = userAuth;
      const createdAt = new Date();
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          photoURL,
          ...additionalInformation,
        });
      } catch (error) {
        console.error(`ERROR: CREATING THE USER, ${error}`);
        throw error;
      }
    }
    //* If the data exists in the database
    //* return userDocRef
    return userSnapshot as QueryDocumentSnapshot<UserData>;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
