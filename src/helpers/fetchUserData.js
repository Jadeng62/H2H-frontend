import { auth, db } from './firebase'
import { doc, getDoc } from 'firebase/firestore'

export const fetchUserData = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log('fetchUserData', user)
        const docRef = doc(db, 'Users', user.uid)
        try {
          const docSnap = await getDoc(docRef)
          console.log('docsnap', docSnap.data())
          if (docSnap.exists()) {
            resolve(docSnap.data())
          } else {
            reject(new Error('No user data found'))
          }
        } catch (error) {
          reject(error)
        }
      } else {
        reject(new Error('No user logged in'))
      }
    })
  })
}
