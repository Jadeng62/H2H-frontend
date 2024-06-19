import { auth, db } from './firebase'
import { doc, getDoc } from 'firebase/firestore'

export const fetchUserData = () => {
  return new Promise((resolve, reject) => {
    //tracks current auth state in Firebase
    auth.onAuthStateChanged(async (user) => {
      console.log('user', user.uid)
      if (user.uid) {
        console.log('fetchUserData', user)

        // retrieve the information from the Firestore DB
        const docRef = doc(db, 'Users', user.uid)
        try {
          const docSnap = await getDoc(docRef)
          console.log('docsnap', docSnap.data())
          if (docSnap.exists()) {
            resolve(docSnap.data())
          } else {
            reject(new Error('No user data found'))
            return false
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
