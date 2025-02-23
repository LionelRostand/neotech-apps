
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAp8SJ4DT3-uDRKjU-rpoVMVVORQrPfFls",
  authDomain: "neotech-4a0f2.firebaseapp.com",
  projectId: "neotech-4a0f2",
  storageBucket: "neotech-4a0f2.appspot.com", // Updated this line
  messagingSenderId: "231121595048",
  appId: "1:231121595048:web:e53c8312ce951db4b1f09d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

