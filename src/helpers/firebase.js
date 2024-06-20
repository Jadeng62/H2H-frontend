// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// more DRY than repeating import.mete.env=VITE_FIREBASE_ over and over
const envKey = (key) => import.meta.env[`VITE_FIREBASE_${key}`]

// Your firebase configuration which you will see in your manual Firebase app on the platform. You will have to store those key values in your .env file. Check the .env.example file for reference

const firebaseConfig = {
  apiKey: envKey('API_KEY'),
  authDomain: envKey('AUTH_DOMAIN'),
  projectId: envKey('PROJECT_ID'),
  storageBucket: envKey('STORAGE_BUCKET'),
  messagingSenderId: envKey('MESSAGING_SENDER_ID'),
  appId: envKey('APP_ID'),
  measurementId: envKey('MEASUREMENT_ID'),
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth = getAuth()
export default app
