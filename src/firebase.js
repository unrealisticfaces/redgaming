import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCEYqh_sbg1S9dxbQmtdhIZl6cuHC7S_YM",
  authDomain: "redgaming-ef36c.firebaseapp.com",
  projectId: "redgaming-ef36c",
  storageBucket: "redgaming-ef36c.firebasestorage.app",
  messagingSenderId: "278800769536",
  appId: "1:278800769536:web:5bf043027c2641347aeee5",
  databaseURL: "https://redgaming-ef36c-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getDatabase(app)