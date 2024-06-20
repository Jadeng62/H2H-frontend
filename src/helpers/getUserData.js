import { auth } from './firebase'
import { fetchUser } from './fetchUser'

export const getUserData = () => {
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

        //helper function to do the actual fetched. abstracted because it is used in two placees in this code
        const retrievedUser = await fetchUser(user, token)

        // this is the same as a return but returns a promise
        resolve(retrievedUser)
      } catch (error) {
        reject(new Error('Failed to retrieve user data: ' + error.message))
      }
    })
  })
}
