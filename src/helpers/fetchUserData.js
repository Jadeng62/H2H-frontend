import { auth } from './firebase'

const URL = import.meta.env.VITE_BASE_URL
export const fetchUserData = () => {
  console.log('fetchuserdata running')
  return new Promise((resolve, _reject) => {
    //tracks current auth state in Firebase
    auth.onAuthStateChanged(async (user) => {
      if (!user || !user.uid) return
      if (user.uid) {
        const token = localStorage.getItem('token')

        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await fetch(
          `${URL}/api/auth/user/${user.uid}`,
          options
        )
        const retrievedUser = response.json()

        resolve(retrievedUser)
      } else {
        return
      }
    })
  })
}
