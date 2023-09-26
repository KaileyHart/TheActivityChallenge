import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "{APIKEY}",
  authDomain: "{AUTHDOMAIN}",
  projectId: "{PROJECTID}",
  storageBucket: "{STORAGEBUCKET}",
  messagingSenderId: "{MESSAGINSENDERID}",
  appId: "{APPID}",
  measurementId: "{MEASUREMENTID}",
};

export const firebase_app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(firebase_app);
export const firebase_db = getFirestore(firebase_app);
export const analytics = getAnalytics(firebase_app);
