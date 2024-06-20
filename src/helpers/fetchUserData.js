import { auth } from './firebase'
import { getUser } from './getUser'

export const fetchUserData = () => {
  return new Promise((resolve, reject) => {
    //tracks current auth state in Firebase
    auth.onAuthStateChanged(async (user) => {
      if (!user || !user.uid) {
        reject(new Error('No user or user ID found'))
        return
      }

      try {
        // checking local storage will prove user is logged in
        const token = localStorage.getItem('token')

        const retrievedUser = await getUser(user, token)

        resolve(retrievedUser)
      } catch (error) {
        reject(new Error('Failed to retrieve user data: ' + error.message))
      }
    })
  })
}
