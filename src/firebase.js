import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCEYqh_sbg1S9dxbQmtdhIZl6cuHC7S_YM",
  authDomain: "redgaming-ef36c.firebaseapp.com",
  projectId: "redgaming-ef36c",
  storageBucket: "redgaming-ef36c.firebasestorage.app",
  messagingSenderId: "278800769536",
  appId: "1:278800769536:web:5bf043027c2641347aeee5"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Export Authentication and Database instances
export const auth = getAuth(app)
export const db = getFirestore(app)