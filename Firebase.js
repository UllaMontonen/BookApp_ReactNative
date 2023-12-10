import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import Constants from 'expo-constants'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// The FirebaseConfig information should be stored in a new file (make sure to add this file to the gitignore).
// The original information is not shared publicly on GitHub. Please refer to the Firebase website for 
// more information on creating a new project and database.
const firebaseConfig = process.env.EXPO_PUBLIC_FIREBASE_CONFIG || Constants.expoConfig.extra.firebaseConfig;


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase(app);

export {db, app, auth}
export default getDatabase(app);