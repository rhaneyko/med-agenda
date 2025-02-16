// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBkjy8WSl9QJh3HL0sznT-GJuuHR09lX7M",
    authDomain: "med-agenda-6c24f.firebaseapp.com",
    projectId: "med-agenda-6c24f",
    storageBucket: "med-agenda-6c24f.firebasestorage.app",
    messagingSenderId: "689912950987",
    appId: "1:689912950987:web:c51b0c48f01f5254dceb4e",
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);