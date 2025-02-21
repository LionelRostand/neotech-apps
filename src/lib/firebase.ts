
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'neotech-apps.firebaseapp.com',
  projectId: 'neotech-apps',
  storageBucket: 'neotech-apps.appspot.com',
  messagingSenderId: 'your-sender-id',
  appId: 'your-app-id'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
